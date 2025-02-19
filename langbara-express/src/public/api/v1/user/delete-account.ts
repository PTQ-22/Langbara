import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../../../app";
import { logger } from "../../../../logger";
import { decryptUserCredentials } from "../../../../logic/user-credentials";

export const router = express.Router();

interface DeleteAccountRequestBody extends express.Request {
  query: {
    authcookie: string;
  };
  body: {
    password: string;
  };
}

router.delete(
  "/",
  async (req: DeleteAccountRequestBody, res: express.Response) => {
    if (!req.body || !req.body.password) {
      logger.warn("Invalid request body!", req.body);
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    if (req.body.password.length > 200) {
      res.setHeader("api-code", 1001);
      res.status(200).json({ msg: "Invalid request data!" });
      return;
    }

    const uid = decryptUserCredentials(req.query.authcookie)?.uid;

    const dbRes = await pool.query(`SELECT passwd FROM users WHERE id = $1`, [
      uid,
    ]);

    if (dbRes.rowCount > 0) {
      const passwordHash = dbRes.rows[0].passwd;
      const isPasswdCorrect = await bcrypt.compare(
        req.body.password,
        passwordHash
      );
      if (isPasswdCorrect) {
        
        await pool.query(`DELETE FROM users WHERE id = $1`, [uid]);

        res.setHeader("api-code", 0);
        res.status(204).json({
          msg: `Deleted user with id: ${uid}`,
        });
        return;
      } else {
        res.setHeader("api-code", 5001);
        res.status(200).json({
          msg: "Invalid password!",
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
