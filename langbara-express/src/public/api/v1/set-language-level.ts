import express from "express";
import { pool } from "../../../app";
import { decryptUserCookie, encryptUserCookie, LanguageLevel } from "../../../logic/user-cookies";

export const router = express.Router();

interface LanguageLevelRequest extends express.Request {
  body: {
    lvl: string;
  }
}

router.post("/set-language-level", async (req: LanguageLevelRequest, res: express.Response) => {
  if(!req.query || typeof(req.body.lvl) === 'undefined') {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }
  
  const lvlNumber = parseInt(req.body.lvl);

  if(isNaN(lvlNumber)) {
    res.setHeader("api-code", 1002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const cookie = req.cookies["auth"];
    
  if (!cookie) {
    res.setHeader("api-code", 3000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const userData = decryptUserCookie(cookie);

  if (!userData) {
    res.setHeader("api-code", 3002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  // if user is unregistered will not find any id => no set
  await pool.query(`
    UPDATE users
    SET data = jsonb_set(data, '{"language_level"}', $2)
    WHERE id = $1
  `, [userData.uid, lvlNumber]);

  userData.language_level = lvlNumber;

  const newCookie = encryptUserCookie(userData);

  res.setHeader('api-code', 0);
  res.json({
    msg: 'OK',
    cookies: {
      auth: newCookie
    }
  })

});