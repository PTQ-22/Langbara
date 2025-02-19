import express from 'express';
import * as userCookies from "../../../../logic/user-cookies";
import { pool } from "../../../../app";
import {v4 as uuidv4} from 'uuid';
import { LanguageLevel } from '../../../../logic/user-cookies';
import { DROP_POINTS_TABLE, MAX_GUESSES_TABLE, MAX_POINTS_TABLE, ModesNames, POLISH_TIMEZONE_OFFSET } from '../../../../data/constants';
import { logger } from '../../../../logger';
import { hashString } from '../../../../logic/crypto-wrapper';

export const router = express.Router();

interface PlayRequest extends express.Request {
  body: {
    level: string
  }
};

router.post('/', async (req: PlayRequest, res: express.Response) => {
  if (!req.body || !req.body.level
  ) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const levelString = req.body.level;

  let shouldDefinitionBeInPolish = true;

  if(/[BC][12]/i.test(levelString)) {
    shouldDefinitionBeInPolish = false;
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

  const userData = userCookies.decryptUserCookie(cookie);

  if (!userData) {
    res.setHeader("api-code", 3002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  // @ts-ignore
  const levelInt = LanguageLevel[levelString];

  const guesses_left = MAX_GUESSES_TABLE[levelInt];

  const token = hashString(ModesNames.UNLIMITED + userData.uid + levelInt);

  const data = {guesses_left: guesses_left, type: ModesNames.UNLIMITED};

  const dbRes = await pool.query(`
    SELECT * FROM get_unlimited($1, $2, $3, $4, $5)
  `, [token, userData.uid, userData.account_type, data, levelInt]);

  if (dbRes.rowCount === 0) {

    const dbWordsNum = await pool.query('SELECT COUNT(*) AS cnt FROM words WHERE lvl = $1 AND enabled', [levelInt]);
    res.setHeader("api-code", 7000);
    res.status(200).json({
      msg: "All words have been already answered",
      data: dbWordsNum.rows[0].cnt.toString()
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
  })

});

interface CheckRequest extends express.Request {
  body: {
    guess: string;
    token: string;
  }
}

router.post('/guess', async (req: CheckRequest, res: express.Response) => {
  if (!req.body || !req.body.guess || !req.body.token
  ) {
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

  const userData = userCookies.decryptUserCookie(cookie);

  if (!userData) {
    res.setHeader("api-code", 3002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const token = req.body.token;

  const dbRes = await pool.query(`
    SELECT *
    FROM words
    WHERE EXISTS (
      SELECT FROM pendingGames
      WHERE pendingGames.user_id = $1 AND pendingGames.word_id = words.id AND pendingGames.token = $2
    )
  `, [userData.uid, token]);

  if(dbRes.rowCount === 0) {
    res.setHeader("api-code", 8000);
    res.status(200).json({
      msg: "Invalid game!",
    });
    return;
  }

  const wordEntry = dbRes.rows[0];

  let newUserCookie = cookie;
  let isCorrect = wordEntry.word.toLocaleLowerCase() === req.body.guess;
  let pointsEarned = 0;
  let wordLvl = wordEntry.lvl;
  let guesses_left = 0;
  
  if(isCorrect) {

    // point updating
    const dbResPointsEarned = await pool.query(`
      SELECT update_points($1, $2, $3, $4, $5, $6) AS earned;
    `, [token, userData.uid, userData.account_type, MAX_POINTS_TABLE[wordLvl], DROP_POINTS_TABLE[wordLvl], MAX_GUESSES_TABLE[wordLvl]]);
    
    pointsEarned = dbResPointsEarned.rows[0].earned;

    userData.points += pointsEarned;

    guesses_left = 0;

  } else {

    const dbResGuessesLeft = await pool.query(`
      UPDATE pendinggames
      SET 
        data = jsonb_set(data, '{"guesses_left"}', to_jsonb((data->>'guesses_left')::int - 1))
      WHERE token = $1
      RETURNING (data->>'guesses_left')::int AS guesses_left
    `, [token]);

    guesses_left = dbResGuessesLeft.rows[0].guesses_left;
  }

  if(guesses_left === 0) {
    const dbPrevGame = await pool.query(`
      DELETE FROM pendingGames
      WHERE token = $1
      RETURNING *
    `, [token]);

    
    if(userData.account_type === userCookies.AccountType.REGISTERED) {
      const prevGame = dbPrevGame.rows[0];

      await pool.query(`
        INSERT INTO games(id, user_id, word_id, data)
        VALUES ($1, $2, $3, $4)
      `, [
        uuidv4(),
        userData.uid,
        prevGame.word_id,
        {
          type: prevGame.data.type,
          earned: pointsEarned
        }
      ])
    }

    if(dbPrevGame.rows[0].data.type === ModesNames.DAILY) {
      const now = new Date();
      // server/db times are in UTC... fuck timezones
      now.setTime(now.getTime() + POLISH_TIMEZONE_OFFSET);
      
      userData.daily.last_game_date = now;

      if(userData.account_type === userCookies.AccountType.REGISTERED) {
        await pool.query(`
          UPDATE users
          SET data = jsonb_set(data, '{"daily", "last_game_date"}', to_jsonb($2::TEXT))
          WHERE id = $1
        `, [userData.uid, now.toISOString()])
      }
        
    
    }
  }

  newUserCookie = userCookies.encryptUserCookie(userData);

  res.setHeader('api-code', 0);
  res.status(200).json({
    msg: "OK",
    correct: isCorrect,
    points: pointsEarned,
    guesses_left: guesses_left,
    word: (guesses_left === 0 ? wordEntry.word : ''),
    cookies: {
      auth: newUserCookie
    }
  });
});

interface ResignReqBody extends express.Request {
  body: {
    token: string;
  }
}

router.post('/resign', async(req: ResignReqBody, res: express.Response) => {
  if(!req.body || !req.body.token) {
    res.setHeader("api-code", 1000);
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

  const userData = userCookies.decryptUserCookie(cookie);

  if (!userData) {
    res.setHeader("api-code", 3002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const token = req.body.token;

  const dbRes = await pool.query(`
    SELECT *
    FROM words
    WHERE EXISTS (
      SELECT FROM pendingGames
      WHERE pendingGames.user_id = $1 AND pendingGames.word_id = words.id AND pendingGames.token = $2
    )
  `, [userData.uid, token]);

  if(dbRes.rowCount === 0) {
    res.setHeader("api-code", 8000);
    res.status(200).json({
      msg: "Invalid game!",
    });
    return;
  }

  await pool.query(`
    DELETE FROM pendinggames
    WHERE token = $1
  `, [token]);

    
  res.setHeader('api-code', 0);
  res.status(200).json({
    msg: "OK",
    correct: dbRes.rows[0].word
  });
});

interface HintReqQuery extends express.Request {
  query: {
    num: string;
    token: string;
  }
}

// NOT FINISHED !!!
router.get("/hint", async(req: HintReqQuery, res: express.Response) => {
  if (!req.body || !req.query.num || !req.query.token
  ) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const num = parseInt(req.query.num);

  if(isNaN(num)) {
    res.setHeader("api-code", 9001);
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

  const token = req.query.token;

  const userData = userCookies.decryptUserCookie(cookie);

  if (!userData) {
    res.setHeader("api-code", 3002);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const dbRes = await pool.query(`
    WITH pending AS (
      SELECT pendingGames.word_id FROM pendingGames
      WHERE pendingGames.token = $1
    )
    SELECT data->'hints' as hints FROM words, pending WHERE id = pending.word_id
  `, [token]);

  if(dbRes.rowCount === 0) {
    res.setHeader("api-code", 8000);
    res.status(200).json({
      msg: "Invalid game!",
    });
    return;
  }

  const hints = dbRes.rows[0].hints;

  if(num >= hints.length) {
    res.setHeader('api-code', 9002);
    res.status(200).json({
      msg: 'No more hints for ya'
    });
    return;
  }

  res.setHeader('api-code', 0);
  res.status(200).json({
    msg: "OK",
    hint: hints[num]
  });
});