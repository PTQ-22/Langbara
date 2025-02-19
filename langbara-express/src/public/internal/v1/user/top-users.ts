import express from "express";
import { pool } from "../../../../app";

export const router = express.Router();

router.get(
  "/top-users",
  async (req: express.Request, res: express.Response) => {

    const dbRes = await pool.query(
      `SELECT display_name, points FROM users ORDER BY points DESC LIMIT 100`
    );

    const users = dbRes.rows;

    res.setHeader("api-code", 0);
    res.status(201).json({
      users
    });
  }
);
