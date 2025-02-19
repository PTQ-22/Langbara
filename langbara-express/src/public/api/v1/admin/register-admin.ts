import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../../../app";
import { logger } from "../../../../logger";

export const router = express.Router();

const SALT_ROUNDS = 10;

interface RegisterAdminRequestBody extends express.Request {
  body: {
    name: string;
    password: string;
  };
}

router.post(
  "/register",
  async (req: RegisterAdminRequestBody, res: express.Response) => {
    // verify request data
    if (!req.body || !req.body.name || !req.body.password) {
      logger.warn("Invalid request body!", req.body);
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    if (req.body.name.length > 30 || req.body.password.length > 200) {
      logger.warn(
        "Data in request is too long: name.length = ",
        req.body.name.length
      );
      res.setHeader("api-code", 1001);
      res.status(200).json({ msg: "Invalid request data!" });
      return;
    }
    // check if name is unique
    const dbRes = await pool.query(
      `
      SELECT * FROM admins WHERE name = $1;
      `,
      [req.body.name]
    );
    if (dbRes.rowCount > 0) {
      if (dbRes.rows[0].name == req.body.name) {
        res.setHeader("api-code", 2000);
        res.status(200).json({
          msg: "User with this name already exists!",
        });
        return;
      }
    }

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    await pool.query(
      `
    INSERT INTO admins (name, passwd) VALUES ($1, $2);
    `,
      [req.body.name, hash]
    );

    res.setHeader("api-code", 0);
    res.status(201).json({
      msg: "Admin successfully created!",
    });
  }
);
