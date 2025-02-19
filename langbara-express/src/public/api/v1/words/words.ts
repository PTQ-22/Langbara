import express from "express";
import { pool } from "../../../../app";
import { logger } from "../../../../logger";
import {
  getNewDailyWordFromDB,
  dateToHash,
  WordEntry,
  randomWordFromDB,
  WordEntryWithDate,
  makeWhereToQuery,
  makeOrderByToQuery,
} from "../../../../logic/words";

export const router = express.Router();

interface ReqBody extends Express.Request {
  body: {
    date: string;
    word?: string;
  };
}

// TODO change to API?
router.post("/on-date", async (req: ReqBody, res: express.Response) => {
  if (!req.body || !req.body.date) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const date = new Date(req.body.date);
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);

  const word_id = dateToHash(date);

  const dbRes = await pool.query(
    `
    SELECT *
    FROM words
    WHERE id = $1
  `,
    [word_id]
  );

  if (dbRes.rowCount === 0) {
    res.setHeader("api-code", 6000);
    res.status(200).json({
      msg: "For this date there are any word yet.",
    });
    return;
  }
  const word: WordEntry = dbRes.rows[0];
  res.setHeader("api-code", 0);
  res.status(200).json({
    word,
  });
});

router.get("/new-daily", async (req: ReqBody, res: express.Response) => {
  const word = await getNewDailyWordFromDB();

  word.enabled = false;
  word.is_daily = true;

  res.setHeader("api-code", 0);
  res.status(201).json({ msg: "Success", word: word });
});

router.get("/random", async (req: express.Request, res: express.Response) => {
  const word = await randomWordFromDB();

  res.setHeader("api-code", 0);
  res.status(201).json({ msg: "Success", word: word });
});

interface SaveReqBody extends Express.Request {
  body: {
    word: WordEntryWithDate;
  };
}

router.post("/save", async (req: SaveReqBody, res: express.Response) => {
  if (
    !req.body ||
    !req.body.word ||
    !req.body.word.data ||
    !req.body.word.definition_en ||
    !req.body.word.definition_pl ||
    typeof req.body.word.enabled === "undefined" ||
    // !req.body.word.id ||
    typeof req.body.word.is_daily === "undefined" ||
    !req.body.word.word
  ) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const word = req.body.word;

  console.log(word);

  if (word.date) {
    if(word.id)
    {
      await pool.query(`
        UPDATE words
        SET is_daily=TRUE
        WHERE id=$1
      `,
        [word.id]
      );
    }

    word.id = dateToHash(new Date(word.date));
  }
  else if (!word.id)
  {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  // UPSERT
  await pool.query(
    `
    INSERT INTO words(id, word, definition_pl, definition_en, enabled, is_daily, data, lvl)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (id)
    DO UPDATE SET word = $2, definition_pl = $3, definition_en = $4, enabled = $5, is_daily = $6, data = $7, lvl = $8
  `,
    [
      word.id,
      word.word,
      word.definition_pl,
      word.definition_en,
      word.enabled,
      word.is_daily,
      word.data,
      word.lvl,
    ]
  );

  if (word.date) {
    await pool.query(
      `
      INSERT INTO daily(date, word_id)
      VALUES ($1, $2)
      ON CONFLICT (date)
      DO UPDATE SET word_id = $2
    `,
      [word.date, word.id]
    );
  }

  res.setHeader("api-code", 0);
  res.status(201).json({ msg: "Success" });
});


interface SetEnableReqBody extends express.Request {
  body: {
    wordId: string,
    enabled: boolean;
  }
}

router.post('/set-enabled',async (req: SetEnableReqBody, res: express.Response) => {
  if (
    !req.body ||
    typeof req.body.wordId === "undefined" ||
    typeof req.body.enabled === "undefined"
  ) {
    res.setHeader("api-code", 1000);
    res.status(200).json({
      msg: "Invalid request data!",
    });
    return;
  }

  const dbRes = await pool.query(`
    UPDATE words
    SET enabled = $1
    WHERE id = $2
    RETURNING id
  `, [req.body.enabled, req.body.wordId]);

  res.setHeader('api-code', 0);
  res.status(200).json({
    msg: `Updated ${dbRes.rowCount} row(s)`
  });
});



interface DailyListReqBody extends Express.Request {
  body: {
    month: number;
    year: number;
  };
}

router.post(
  "/daily-list",
  async (req: DailyListReqBody, res: express.Response) => {
    if (
      !req.body ||
      typeof req.body.month === "undefined" ||
      typeof req.body.year === "undefined"
    ) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }

    const dbRes = await pool.query(
      `
    SELECT date FROM daily WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
  `,
      [req.body.month, req.body.year]
    );

    res.setHeader("api-code", 0);
    res.status(200).json({
      msg: "OK",
      dates: dbRes.rows,
    });
  }
);

interface CountWordsRequest extends Express.Request {
  query: {
    search: string;
    enabled: string; // "false" or "true"
    isDaily: string; // "false" or "true"
  };
}

router.get("/count", async (req: CountWordsRequest, res: express.Response) => {
  if (req.query.enabled) {
    if (req.query.enabled !== "false" && req.query.enabled !== "true") {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }
  if (req.query.isDaily) {
    if (req.query.isDaily !== "false" && req.query.isDaily !== "true") {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }

  let whereToQuery = makeWhereToQuery(req.query.enabled, req.query.isDaily);

  let dbRes;
  if (req.query.search) {
    whereToQuery = whereToQuery.replace("WHERE", "AND");
    dbRes = await pool.query(
      `
      SELECT COUNT(*) FROM words WHERE word LIKE LOWER($1) || '%' ${whereToQuery}
  `,
      [req.query.search]
    );
  } else {
    dbRes = await pool.query(
      `
      SELECT COUNT(*) FROM words ${whereToQuery}
    `
    );
  }
  res.setHeader("api-code", 0);
  res.status(200).json({
    msg: "OK",
    wordsCount: dbRes.rows[0].count,
  });
});

interface GetWordsRequest extends Express.Request {
  query: {
    offset: string;
    limit: string;
    search: string;
    orderBy: string;
    descending: string; // "false" or "true"
    enabled: string; // "false" or "true"
    isDaily: string; // "false" or "true"
  };
}

const orderByPossibleOptions = ["word", "lvl"];

router.get("/", async (req: GetWordsRequest, res: express.Response) => {
  let offset;
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
    if (Number.isNaN(offset) || offset < 0) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }
  let limit;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
    if (Number.isNaN(limit) || limit < 0) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }
  if (req.query.orderBy) {
    if (!orderByPossibleOptions.includes(req.query.orderBy)) {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }
  if (req.query.descending) {
    if (req.query.descending !== "false" && req.query.descending !== "true") {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }
  if (req.query.enabled) {
    if (req.query.enabled !== "false" && req.query.enabled !== "true") {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }
  if (req.query.isDaily) {
    if (req.query.isDaily !== "false" && req.query.isDaily !== "true") {
      res.setHeader("api-code", 1000);
      res.status(200).json({
        msg: "Invalid request data!",
      });
      return;
    }
  }

  const offsetToQuery = offset ? offset : "0";
  const limitToQuery = limit ? limit : "100";

  let whereToQuery = makeWhereToQuery(req.query.enabled, req.query.isDaily);
  let orderByToQuery = makeOrderByToQuery(
    req.query.orderBy,
    req.query.descending
  );

  let dbRes;
  if (req.query.search) {
    whereToQuery = whereToQuery.replace("WHERE", "AND");
    dbRes = await pool.query(
      `
      SELECT * FROM words WHERE LENGTH(id) < 40 AND word LIKE LOWER($1) || '%' ${whereToQuery} ${orderByToQuery} OFFSET $2 LIMIT $3
  `,
      [req.query.search, offsetToQuery, limitToQuery]
    );
  } else {
    whereToQuery = whereToQuery.replace("WHERE", "AND");
    dbRes = await pool.query(
      `
      SELECT * FROM words WHERE LENGTH(id) < 40 ${whereToQuery} ${orderByToQuery} OFFSET $1 LIMIT $2
    `,
      [offsetToQuery, limitToQuery]
    );
  }

  res.setHeader("api-code", 0);
  res.status(200).json({
    msg: "OK",
    words: dbRes.rows,
  });
});
