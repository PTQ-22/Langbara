import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../../../app";
import { logger } from "../../../../logger";
import {
  CheckResult,
  checkUserCredentialsEncrypted,
  decryptUserCredentials,
} from "../../../../logic/user-credentials";

export const router = express.Router();

const SALT_ROUNDS = 10;

interface UserChangePasswordRequestBody extends express.Request {
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
  async (req: UserChangePasswordRequestBody, res: express.Response) => {
    const authcookie = req.query.authcookie;

    if (!authcookie) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "No auth cookie specified in query",
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
      req.body.newPassword.length > 200
    ) {
      res.setHeader("api-code", 1001);
      res.status(200).json({ msg: "Invalid request data!" });
      return;
    }

    const uid = decryptUserCredentials(authcookie)?.uid;

    const dbRes = await pool.query(`SELECT passwd FROM users WHERE id = $1`, [
      uid,
    ]);

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
          `UPDATE users
          SET passwd = $1
          WHERE id = $2;`,
          [newPasswordHash, uid]
        );
        res.setHeader("api-code", 0);
        res.status(201).json({
          msg: `Password changed for user with id: ${uid}`,
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
    logger.warn("Invalid user id!", uid);
    res.setHeader("api-code", 5000);
    res.status(200).json({
      msg: "User with this id doesn't exist",
    });
  }
);
