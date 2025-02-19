import express from "express";
import { pool } from "../../../app";
import * as userCookies from "../../../logic/user-cookies";
import { logger } from "../../../logger";
import {
  CheckResult,
  checkUserCredentialsForLogin,
} from "../../../logic/user-credentials";
import { copyof } from "../../../logic/utils";

export const router = express.Router();

interface LoginRequestBody extends express.Request {
  body: {
    login: string;
    passwd: string;
    token2FA: string;
  };
}

router.post("/login", async (req: LoginRequestBody, res: express.Response) => {
  if (!req.body || !req.body.login || !req.body.passwd) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  if (req.body.login.length > 30 || req.body.passwd.length > 200) {
    logger.warn(
      "Data in request is too long, displayName.length",
      req.body.login.length
    );
    res.setHeader("api-code", 1001);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const dbRes = await pool.query(
    `
    SELECT id, display_name, data->>'language_level' as lvl, points, streak, data->'daily' as daily
    FROM users
    WHERE display_name = $1 OR email = $1
  `,
    [req.body.login]
  );

  if (dbRes.rowCount === 0) {
    res.setHeader("api-code", 4000);
    res.status(200).json({
      msg: "Invalid login or password!",
    });
    return;
  }

  const userId = dbRes.rows[0].id;
  const { passwd, token2FA } = req.body;

  const checkResult = await checkUserCredentialsForLogin({
    uid: userId,
    passwd: passwd,
    token2FA: token2FA,
  });

  if (checkResult === CheckResult.CORRECT) {
    const newCookie = copyof(userCookies.DEFAULT_USER_COOKIE);
    newCookie.uid = userId;
    newCookie.account_type = userCookies.AccountType.REGISTERED;
    newCookie.language_level = parseInt(dbRes.rows[0].lvl);
    newCookie.points = dbRes.rows[0].points;
    newCookie.streak = dbRes.rows[0].streak;
    newCookie.registered.display_name = dbRes.rows[0].display_name;
    newCookie.registered.passwd = passwd;
    newCookie.daily = dbRes.rows[0].daily;
    //const newCookie = userCookies.login(userId, dbRes.rows[0].lvl, dbRes.rows[0].display_name,  req.body.passwd);

    res.setHeader("api-code", 0);
    res.status(200).json({
      msg: "Success!",
      auth: userCookies.encryptUserCookie(newCookie),
    });
  } else if (checkResult === CheckResult.INVALID_LOGIN) {
    res.setHeader("api-code", 4000);
    res.status(200).json({
      msg: "Invalid login or password",
    });
  } else if (checkResult === CheckResult.INVALID_PASSWD) {
    res.setHeader("api-code", 4001);
    res.status(200).json({
      msg: "Invalid login or password",
    });
  } else if (checkResult === CheckResult.TOKEN_2FA_REQUIRED) {
    res.setHeader("api-code", 4002);
    res.status(200).json({
      msg: "2FA token required",
    });
  } else if (checkResult === CheckResult.INVALID_2FA_TOKEN) {
    res.setHeader("api-code", 4003);
    res.status(200).json({
      msg: "Invalid 2fa token",
    });
  } else {
    res.status(500);
  }

});
