import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../../app";
import * as userCookies from "../../../logic/user-cookies";
import { logger } from "../../../logger";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { isCaptchaResponseValid } from "../../../logic/captcha-verify";

export const router = express.Router();

const SALT_ROUNDS = 10;

interface RegisterUserRequestBody extends express.Request {
  body: {
    displayName: string;
    email: string;
    password: string;
    captchaResponse: string;
  };
}

router.post(
  "/register",
  async (req: RegisterUserRequestBody, res: express.Response) => {
    // verify request data
    if (
      !req.body ||
      !req.body.displayName ||
      !req.body.email ||
      !req.body.password ||
      !req.body.captchaResponse
    ) {
      logger.warn("Invalid request body!", req.body);
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    // get data from cookies
    const cookie = req.cookies["auth"];
    
    // check if provided data is valid
    if (!cookie) {
      res.setHeader("api-code", 3000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
    
    if (!(await isCaptchaResponseValid(req.body.captchaResponse))) {
      res.setHeader("api-code", 2003);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    if (req.body.displayName.length > 30 || req.body.email.length > 255 || req.body.password.length > 200) {
      logger.warn(
        "Data in request is too long, displayName.length",
        req.body.displayName.length,
        " email.length ",
        req.body.email.length
      );
      res.setHeader("api-code", 1001);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    // getDataCookies require decryption so moved under checks to cut unnecessary computations
    const userData = userCookies.decryptUserCookie(cookie);
    logger.debug(userData);
    
    if (!userData) {
      res.setHeader("api-code", 3002);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    // check if name, email and uid provided are unique
    const dbRes = await pool.query(
      `
  SELECT display_name, email FROM users WHERE display_name = $1 OR email = $2 OR id = $3;
  `,
      [req.body.displayName, req.body.email, userData.uid]
    );

    if (dbRes.rowCount > 0) {
      if (dbRes.rows[0].display_name === req.body.displayName) {
        res.setHeader("api-code", 2000);
        res.status(200).json({
          msg: "User with this name already exists!",
        });
        return;
      } else if (dbRes.rows[0].email === req.body.email) {
        res.setHeader("api-code", 2001);
        res.status(200).json({
          msg: "User with this email already exists!",
        });
      } else {
        res.setHeader("api-code", 2002);
        res.status(200).json({
          msg: "Invalid request data!",
        });
      }
      return;
    }

    // generate hash and uuid
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    // register user
    await pool.query(
      `
    INSERT INTO users(id, display_name, email, passwd, points, streak, data)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `,
      [
        userData.uid,
        req.body.displayName,
        req.body.email,
        hash,
        userData.points,
        userData.streak,
        {
          created_date: new Date(),
          language_level: userData.language_level,
          daily: userData.daily
        },
      ]
    );

    const newCookie = userCookies.encryptUserCookie(userCookies.register(userData, req.body.displayName, req.body.password));

    res.setHeader("api-code", 0);
    res.status(201).json({
      msg: "User successfully created!",
      auth: newCookie
    });
  }
);
