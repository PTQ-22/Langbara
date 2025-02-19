import { pool } from "../app";
import * as crypto from "crypto";

type WordData = {
  hints: string[];
  part: string;
};

export interface WordEntry {
  id: string;
  word: string;
  definition_pl: string;
  definition_en: string;
  enabled?: boolean;
  is_daily?: boolean;
  lvl: number;
  data: WordData;
}

export interface WordEntryWithDate extends WordEntry {
  date?: string;
}

export async function randomWordFromDB(): Promise<WordEntry> {
  const dbRes = await pool.query(`
    SELECT id, word, definition_en, definition_pl, data, lvl FROM words
    WHERE enabled
    ORDER BY RANDOM()
    LIMIT 1
  `);
  const wordEntry = dbRes.rows[0] as WordEntry;

  return wordEntry;
}

export async function getNewDailyWordFromDB(): Promise<WordEntry> {
  const dbRes = await pool.query(`
    WITH available AS (
      SELECT id, word, definition_en, definition_pl, data, lvl
      FROM words 
      WHERE NOT is_daily AND enabled
    )
    SELECT id, word, definition_en, definition_pl, data, lvl
    FROM available
    OFFSET FLOOR(RANDOM() * (SELECT COUNT(*) FROM available))
    LIMIT 1
  `);

  /*
  SELECT id, word, definition_en, definition_pl, data FROM words
    WHERE NOT is_daily AND enabled
    ORDER BY RANDOM()
    LIMIT 1
  */

  const wordEntry = dbRes.rows[0] as WordEntry;

  return wordEntry;
}

export function dateToHash(date: Date): string {
  const str = date.getUTCDate() + "-" + date.getUTCMonth() + "-" + date.getUTCFullYear();

  let tmp = "";

  for (let i = 0; i < str.length; i++) {
    tmp += str.charCodeAt(i).toString();
  }

  const base64encoded = Buffer.from(tmp).toString("base64");

  return crypto.createHash("sha256").update(base64encoded).digest("hex");
}

export const makeWhereToQuery = (enabled: string, isDaily: string): string => {
  let whereToQuery = "";
  if (enabled) {
    whereToQuery += "WHERE ";
    if (enabled === "true") {
      whereToQuery += "enabled = true";
    } else {
      whereToQuery += "enabled = false";
    }
  }
  if (isDaily) {
    if (whereToQuery.length > 0) {
      whereToQuery += " AND ";
    } else {
      whereToQuery += "WHERE ";
    }
    if (isDaily === "true") {
      whereToQuery += "is_daily = true";
    } else {
      whereToQuery += "is_daily = false";
    }
  }
  return whereToQuery;
};

export const makeOrderByToQuery = (orderBy: string, descending: string): string => {
  let orderByToQuery = "ORDER BY ";
  if (orderBy) {
    if (orderBy === "word") {
      orderByToQuery += "word";
    } else {
      orderByToQuery += "lvl";
    }
    if (descending === "true") {
      orderByToQuery += " DESC";
    }
  } else {
    orderByToQuery += 'id ASC'
  }
  return orderByToQuery;
}
