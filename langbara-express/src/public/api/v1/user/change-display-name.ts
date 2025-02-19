import express from "express";
import { pool } from "../../../../app";
import { logger } from "../../../../logger";
import { decryptUserCookie, encryptUserCookie, UserCookie } from "../../../../logic/user-cookies";
import { decryptUserCredentials } from "../../../../logic/user-credentials";

export const router = express.Router();

interface ChangeDisplayNameRequestBody extends express.Request {
  query: {
    authcookie: string;
  };
  body: {
    newDisplayName: string;
  };
}

router.post(
  "/change-display-name",
  async (req: ChangeDisplayNameRequestBody, res: express.Response) => {
    if (!req.body || !req.body.newDisplayName) {
      logger.warn("Invalid request body!", req.body);
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    if (req.body.newDisplayName.length > 30) {
      res.setHeader("api-code", 1001);
      res.status(200).json({ msg: "Invalid request data!" });
      return;
    }

    const authcookie = req.query.authcookie;

    const newDisplayName = req.body.newDisplayName;

    const decryptedCookie = decryptUserCookie(authcookie)!;

    const uid = decryptedCookie.uid;

    const newNameDbRes = await pool.query(`
      SELECT id FROM users WHERE display_name = $1
    `, [newDisplayName]);

    if(newNameDbRes.rowCount > 0 && newNameDbRes.rows[0].id !== uid) {
      res.setHeader("api-code", 2000);
      res.status(200).json({ msg: "User already exists" });
      return;
    }

    decryptedCookie.registered.display_name = newDisplayName;

    const newCookie = encryptUserCookie(decryptedCookie);

    const dbRes = await pool.query(`SELECT display_name FROM users WHERE id = $1`, [
      uid,
    ]);

    if (dbRes.rowCount > 0) {
        await pool.query(
          `UPDATE users
          SET display_name = $1
          WHERE id = $2;`,
          [newDisplayName, uid]
        );
        res.setHeader("api-code", 0);
        res.status(201).json({
          msg: `DisplayName changed for user with id: ${uid}`,
          auth: newCookie
        });
        return;
    }
    // user doesn't exist
    logger.warn("Invalid user id!", uid);
    res.setHeader("api-code", 5000);
    res.status(200).json({
      msg: "User with this id doesn't exist",
    });
  }
);
