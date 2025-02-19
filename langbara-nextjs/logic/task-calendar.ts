import { ViewCallbackProperties } from "react-calendar";
import { API_URL } from "../data/constants";
import { EMPTY_WORD, WordEntry, WordEntryWithDate } from "../types/word";

const WORDS_API_ENDPOINT = `${API_URL}/words/`;

export const createFormReadyHintsArray = (
  hints: string[]
): {
  content: string;
}[] => {
  const arr: {
    content: string;
  }[] = [];
  hints.forEach((hint) => {
    arr.push({ content: hint });
  });
  return arr;
};

export const createNormalHintsArray = (
  hints: {
    content: string;
  }[]
): string[] => {
  const hintsArr: string[] = [];
  hints.forEach((element) => {
    hintsArr.push(element.content);
  });
  return hintsArr;
};


export const newDaily = async (date: Date): Promise<WordEntry> => {
  const response = await fetch(WORDS_API_ENDPOINT + "new-daily", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
  const apiCode = response.headers.get("api-code");
  if (apiCode === "0") {
    const json = await response.json();
    return json["word"];
  }
  return EMPTY_WORD;
};

export const fetchNewDates = async (date: Date): Promise<string[]> => {
  const response = await fetch(WORDS_API_ENDPOINT + "daily-list", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }),
  });
  
  const apiCode = response.headers.get("api-code");

  if (apiCode === "0") {
    const json = await response.json();
    const datesStrings = json.dates;
    console.log(datesStrings);
    const dates = datesStrings.map((val: any) => new Date(val.date));
    const ret: string[] = dates.map((date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    console.log(ret);
    return ret;
  }
  return [];
}

export const fetchOnDateWord = async (date: Date): Promise<WordEntry> => {
  const response = await fetch(WORDS_API_ENDPOINT + "on-date", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      date: date.toDateString(),
    }),
  });
  const apiCode = response.headers.get("api-code");

  if (apiCode === "0") {
    const json = await response.json();
    return json["word"];
  }
  return EMPTY_WORD;
};
