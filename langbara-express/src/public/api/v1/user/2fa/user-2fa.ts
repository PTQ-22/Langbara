import express from "express";
import { pool } from "../../../../../app";
import { AccountType2FA, generateNew2FAsecret, is2FAtokenValid } from "../../../../../logic/2fa";
import {
  CheckResult,
  checkUserCredentials,
  checkUserCredentialsEncrypted,
  decryptUserCredentials,
} from "../../../../../logic/user-credentials";

export const router = express.Router();

interface AuthCookieQuery extends express.Request {
  query: {
    authcookie: string;
  };
}

router.get("/", async (req: AuthCookieQuery, res: express.Response) => {
  const authcookie = req.query.authcookie;

  if (!authcookie) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "No authcookie specified in query!",
    });
    return;
  }

  const checkResult = await checkUserCredentialsEncrypted(authcookie);
  if (checkResult !== CheckResult.CORRECT) {
    res.setHeader("api-code", 3004);
    res.status(200).json({
      msg: "Invalid authcookie!",
    });
    return;
  }

  const uid = decryptUserCredentials(authcookie)?.uid;
  const dbRes = await pool.query(`SELECT is_2fa FROM users WHERE id = $1`, [
    uid,
  ]);

  if (dbRes.rowCount === 0) {
    res.status(200).json({
      msg: "User with this name doesn't exist!",
    });
    return;
  }

  const is2FA = dbRes.rows[0].is_2fa;

  res.setHeader("api-code", 0);
  res.status(200).json({
    is2FA,
  });
});

interface RegisterRequestBody {
  body: {
    uid: string;
  };
}

router.post(
  "/register",
  async (req: RegisterRequestBody, res: express.Response) => {
    if (!req.body || !req.body.uid) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
    if (req.body.uid.length > 50) {
      res.setHeader("api-code", 1001);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    const uid = req.body.uid;
    const temporarySecret = generateNew2FAsecret(AccountType2FA.USER);

    await pool.query(
      `UPDATE users
    SET secret_2fa = $1
    WHERE id = $2`,
      [temporarySecret.base32, uid]
    );

    res.setHeader("api-code", 0);
    res.status(200).json({
      secret: temporarySecret.otpauth_url,
    });
  }
);

interface VerifyRequestBody {
  body: {
    uid: string;
    token: string;
  };
}

router.post(
  "/verify",
  async (req: VerifyRequestBody, res: express.Response) => {
    if (!req.body || !req.body.uid || !req.body.token) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
    if (req.body.uid.length > 50) {
      res.setHeader("api-code", 1001);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    const dbRes = await pool.query(
      `
      SELECT secret_2fa
      FROM users
      WHERE id = $1;
    `,
      [req.body.uid]
    );

    const temporarySecret = dbRes.rows[0].secret_2fa;

    const isVerified = is2FAtokenValid(temporarySecret, req.body.token);

    if (isVerified) {
      await pool.query(
        `UPDATE users
      SET secret_2fa = $1, is_2fa = true
      WHERE id = $2`,
        [temporarySecret, req.body.uid]
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
    uid: string;
    password: string;
  };
}

router.post("/disable", async (req: DisableRequest, res: express.Response) => {
  if (!req.body || !req.body.uid || !req.body.password) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  if (req.body.uid.length > 50 || req.body.password.length > 200) {
    res.setHeader("api-code", 1001);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }
  const checkResult = await checkUserCredentials({
    uid: req.body.uid,
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
      `UPDATE users set is_2fa = false, secret_2fa = NULL WHERE id = $1`,
      [req.body.uid]
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
