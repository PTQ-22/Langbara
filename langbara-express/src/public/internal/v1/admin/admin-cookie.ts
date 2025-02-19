import express from "express";
import { pool } from "../../../../app";
import {
  checkAdminCredentialsEncrypted,
  CheckResult,
  decryptAdminCredentials,
} from "../../../../logic/admin-credentials";

export const router = express.Router();

interface AdminCookieRequest extends express.Request {
  query: {
    authcookie: string;
  }
}

router.get("/cookie", async (req: AdminCookieRequest, res: express.Response) => {
  const authcookie = req.query.authcookie;

  if (!authcookie) {
    res.status(200).json({
      msg: "No authcookie specified!",
    });
    return;
  }

  const checkResult = await checkAdminCredentialsEncrypted(authcookie);
  const name = decryptAdminCredentials(authcookie)?.name || "";
  res.status(200).json({
    isCorrect: checkResult === CheckResult.CORRECT,
    name: name,
  });
});

interface Is2FARequest extends express.Request{
  query: {
    authcookie: string;
  };
}

router.get("/2fa", async (req: Is2FARequest, res: express.Response) => {
  const authcookie = req.query.authcookie;

  if (!authcookie) {
    res.status(200).json({
      msg: "No authcookie specified!",
    });
    return;
  }

  const checkResult = await checkAdminCredentialsEncrypted(authcookie);
  if (checkResult !== CheckResult.CORRECT) {
    res.status(200).json({
      msg: "Invalid authcookie!",
    });
    return;
  }
  const name = decryptAdminCredentials(authcookie)?.name || "";

  const dbRes = await pool.query(`SELECT is_2fa FROM admins WHERE name = $1`, [
    name,
  ]);

  if (dbRes.rowCount === 0) {
    res.status(200).json({
      msg: "Admin with this name doesn't exist!",
    });
    return;
  }

  const is2FA = dbRes.rows[0].is_2fa;

  res.setHeader("api-code", 0);
  res.status(200).json({
    is2FA,
  });
});