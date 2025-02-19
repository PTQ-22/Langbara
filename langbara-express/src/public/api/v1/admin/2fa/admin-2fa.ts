import express from "express";
import { pool } from "../../../../../app";
import {
  checkAdminCredentialsEncrypted,
  decryptAdminCredentials,
  CheckResult,
  checkAdminCredentials,
} from "../../../../../logic/admin-credentials";
import axios from "axios";
import { AccountType2FA, generateNew2FAsecret, is2FAtokenValid } from "../../../../../logic/2fa";

export const router = express.Router();

interface RegisterRequestBody {
  body: {
    name: string;
  };
}

router.post(
  "/register",
  async (req: RegisterRequestBody, res: express.Response) => {
    if (!req.body || !req.body.name) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
    if (req.body.name.length > 30) {
      res.setHeader("api-code", 1001);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    const adminName = req.body.name;

    const temporarySecret = generateNew2FAsecret(AccountType2FA.ADMIN);

    await pool.query(
      `UPDATE admins
    SET secret_2fa = $1
    WHERE name = $2`,
      [temporarySecret.base32, adminName]
    );

    res.setHeader("api-code", 0);
    res.status(200).json({
      secret: temporarySecret.otpauth_url,
    });
  }
);

interface VerifyRequestBody {
  body: {
    name: string;
    token: string;
  };
}

router.post(
  "/verify",
  async (req: VerifyRequestBody, res: express.Response) => {
    if (!req.body || !req.body.name || !req.body.token) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
    if (req.body.name.length > 30) {
      res.setHeader("api-code", 1001);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    const dbRes = await pool.query(
      `
      SELECT secret_2fa
      FROM admins
      WHERE name = $1;
    `,
      [req.body.name]
    );

    const temporarySecret = dbRes.rows[0].secret_2fa;

    const isVerified = is2FAtokenValid(temporarySecret, req.body.token);

    if (isVerified) {
      await pool.query(
        `UPDATE admins
      SET secret_2fa = $1, is_2fa = true
      WHERE name = $2`,
        [temporarySecret, req.body.name]
      );

      res.setHeader("api-code", 0);
      res.status(200).json({
        verified: true,
      });
      return;
    }
    res.setHeader("api-code", 2004);
    res.status(200).json({
      verified: false,
    });
    return;
  }
);

interface DisableRequest extends Express.Request {
  body: {
    name: string;
    password: string;
  };
}

router.post("/disable", async (req: DisableRequest, res: express.Response) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  if (req.body.name.length > 30 || req.body.password.length > 200) {
    res.setHeader("api-code", 1001);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }
  const checkResult = await checkAdminCredentials({
    name: req.body.name,
    passwd: req.body.password,
  });

  if (checkResult === CheckResult.INVALID_LOGIN) {
    res.setHeader("api-code", 4000);
    res.status(200).json({
      msg: "Invalid login or password",
    });
    return;
  } else if (checkResult === CheckResult.INVALID_PASSWD) {
    res.setHeader("api-code", 4001);
    res.status(200).json({
      msg: "Invalid login or password",
    });
    return;
  } else if (checkResult === CheckResult.CORRECT) {
    await pool.query(
      `UPDATE admins set is_2fa = false, secret_2fa = NULL WHERE name = $1`,
      [req.body.name]
    );
    res.setHeader("api-code", 0);
    res.status(200).json({
      msg: "Success",
    });
    return;
  } else {
    res.status(500);
    return;
  }
});
