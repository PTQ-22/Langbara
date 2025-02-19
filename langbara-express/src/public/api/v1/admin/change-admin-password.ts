import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../../../app";
import { logger } from "../../../../logger";
import {
  checkAdminCredentialsEncrypted,
  CheckResult,
  decryptAdminCredentials,
} from "../../../../logic/admin-credentials";

export const router = express.Router();

const SALT_ROUNDS = 10;

interface AdminChangePasswordRequestBody extends express.Request {
  query: {
    authcookie: string;
  };
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

router.post(
  "/change-password",
  async (req: AdminChangePasswordRequestBody, res: express.Response) => {
    const authcookie = req.query.authcookie;

    if (!authcookie) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "No authcookie specified in query!",
      });
      return;
    }

    const checkResult = await checkAdminCredentialsEncrypted(authcookie);
    if (checkResult !== CheckResult.CORRECT) {
      res.setHeader("api-code", 3005);
      res.status(200).json({
        msg: "Invalid authcookie!",
      });
      return;
    }

    if (!req.body || !req.body.oldPassword || !req.body.newPassword) {
      logger.warn("Invalid request body!", req.body);
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    if (
      req.body.oldPassword.length > 200 ||
      req.body.oldPassword.length > 200
    ) {
      res.setHeader("api-code", 1001);
      res.status(200).json({ msg: "Invalid request data!" });
      return;
    }

    const name = decryptAdminCredentials(authcookie)?.name;

    const dbRes = await pool.query(
      `SELECT passwd FROM admins WHERE name = $1`,
      [name]
    );

    if (dbRes.rowCount > 0) {
      const oldPasswordHash = dbRes.rows[0].passwd;
      const isPasswdCorrect = await bcrypt.compare(
        req.body.oldPassword,
        oldPasswordHash
      );
      if (isPasswdCorrect) {
        const newPasswordHash = await bcrypt.hash(
          req.body.newPassword,
          SALT_ROUNDS
        );
        await pool.query(
          `UPDATE admins
          SET passwd = $1
          WHERE name = $2;`,
          [newPasswordHash, name]
        );
        res.setHeader("api-code", 0);
        res.status(201).json({
          msg: `Password changed for admin: ${name}`,
        });
        return;
      } else {
        res.setHeader("api-code", 5001);
        res.status(200).json({
          msg: "Invalid old password!",
        });
        return;
      }
    }
    // user doesn't exist
    logger.warn("Invalid admin name!", name);
    res.setHeader("api-code", 5000);
    res.status(200).json({
      msg: "Admin with this name doesn't exist",
    });
  }
);
