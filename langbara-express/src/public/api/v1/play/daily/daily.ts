import express from "express";
import * as userCookies from "../../../../../logic/user-cookies";
import { pool } from "../../../../../app";
import { DROP_POINTS_TABLE, MAX_GUESSES_TABLE, MAX_POINTS_TABLE, ModesNames, POLISH_TIMEZONE_OFFSET } from "../../../../../data/constants";
import { hashString } from "../../../../../logic/crypto-wrapper";
import { logger } from "../../../../../logger";

export const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
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

  const userData = userCookies.decryptUserCookie(cookie);

  if (!userData) {
    res.setHeader("api-code", 3002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const levelInt = userData.language_level;

  if(levelInt === null) {
    res.setHeader("api-code", 3006);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }
  
  let shouldDefinitionBeInPolish = true;
  
  if(levelInt > 1) {
    shouldDefinitionBeInPolish = false;
  }
  
  const now = new Date(); // server/db times are in UTC... fuck timezones

  // it will work (i guess...)
  now.setTime(now.getTime() + POLISH_TIMEZONE_OFFSET);
  
  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();

  const guesses_left = MAX_GUESSES_TABLE[levelInt];

  const token = hashString(ModesNames.DAILY + userData.uid + day + '.' + month + '.' + year);

  const data = {guesses_left: guesses_left, type: ModesNames.DAILY};

  // logger.debug([token, userData.uid, userData.account_type, data, day, month, year]);

  const dbRes = await pool.query(`
    SELECT * FROM get_daily($1, $2, $3, $4, $5::INT, $6::INT, $7::INT)
  `, [token, userData.uid, userData.account_type, data, day, month, year]);

  if (dbRes.rowCount === 0) {
    res.setHeader("api-code", 7000);
    res.status(200).json({
      msg: "All words have been already answered",
    });
    return;
  }

  let word = dbRes.rows[0];
  const definition = shouldDefinitionBeInPolish ? word.definition_pl : word.definition_en;

  res.setHeader('api-code', 0);
  res.status(200).json({
    msg: "Success",
    max_points: MAX_POINTS_TABLE[word.lvl],
    points_drop: DROP_POINTS_TABLE[word.lvl],
    word: {
      definition: definition,
      level: word.lvl,
      part: word.part,
      hints_num: word.hints.length
    },
    token: token,
    guesses_left: (word.guesses_left === -1 ? guesses_left : word.guesses_left)
  });
});