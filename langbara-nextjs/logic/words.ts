// copied from express (logic/words.ts)
import { API_URL } from "../data/constants";
import { WordEntry, WordEntryWithDate } from "../types/word";

const WORDS_API_ENDPOINT = `${API_URL}/words/`;

export const saveWord = async (word: WordEntry | WordEntryWithDate) => {
  await fetch(WORDS_API_ENDPOINT + "save", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      word,
    }),
  });
};

interface GetWordsRequest {
  offset?: string;
  limit?: string;
  search?: string;
  orderBy?: string;
  descending?: boolean;
  enabled?: string;
  isDaily?: string;
}

export const fetchWords = async ({
  offset = "",
  limit = "",
  search = "",
  orderBy = "",
  descending = false,
  enabled = "",
  isDaily = "",
}: GetWordsRequest): Promise<WordEntry[]> => {
  const URL = `${WORDS_API_ENDPOINT}?offset=${offset}&limit=${limit}&search=${search}&orderBy=${orderBy}&descending=${descending}&isDaily=${isDaily}&enabled=${enabled}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.words;
};

interface CountWordsRequest {
  search?: string;
  enabled?: string; // "false" or "true"
  isDaily?: string; // "false" or "true"
}

export const fetchWordsCount = async ({
  search = "",
  enabled = "",
  isDaily = "",
}: CountWordsRequest) => {
  const response = await fetch(`${WORDS_API_ENDPOINT}/count?search=${search}&enabled=${enabled}&isDaily=${isDaily}`);
  const data = await response.json();
  return data.wordsCount;
};

export const setWordEnable = async(wordId: string, state: boolean) => {
  await fetch(WORDS_API_ENDPOINT + "set-enabled", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      wordId,
      enabled: state
    }),
  });
};