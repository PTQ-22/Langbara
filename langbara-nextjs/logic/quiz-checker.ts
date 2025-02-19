import { API_URL } from "../data/constants";

export interface WordResponse{
  word: {
    definition: string;
    level: number;
    part: string;
    hints_num: number;
  },
  max_points: number;
  points_drop: number;
  token: string;
  guesses_left: number;
}

export interface ErrorDataResponse {
  data: string;
}

interface WordResponseWithMessage {
  json: WordResponse | ErrorDataResponse;
  msg: string;
}

export async function getWordForUnlimited(level: string): Promise<WordResponseWithMessage | null> {

  const resp = await fetch(`${API_URL}/play`, {
    method: 'POST',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      level: level
    })
  });

  const apiCode = resp.headers.get("api-code");

  const json = await resp.json();

  if(apiCode === '0') {
    return {
      msg: 'OK',
      json: json
    }
  } else if(apiCode === '7000') {
    return {
      msg: 'ANSWERED_ALL',
      json: json
    }
  }

  console.log(apiCode);
  return null;
}

export async function getWordForDaily(): Promise<WordResponse | string | null> {
  const resp = await fetch(`${API_URL}/play/daily`, {
    method: 'GET',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  const apiCode = resp.headers.get("api-code");

  if(apiCode === '0') {
    return await resp.json();
  } else if(apiCode === '7000') {
    return "ANSWERED_ALL";
  }

  console.log(apiCode);
  return null;
}

export interface SendAnswerAPIResponse {
  correct: boolean; // 'isCorrect'
  points: number;
  guesses_left: number;
  word: string; // when guesses_left === 0 this field contains word otherwise just empty string ''
  cookies: {
    auth: string;
  }
};

export async function sendAnswerForUnlimited(guess: string, token: string): Promise<SendAnswerAPIResponse | null> {
  const resp = await fetch(`${API_URL}/play/guess`, {
    method: 'POST',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      guess: guess,
      token: token
    })
  });

  const apiCode = resp.headers.get("api-code");

  if(apiCode === '0') {
    return await resp.json();
  }

  return null;
}

export async function sendResign(token: string): Promise<string | null> {
  const resp = await fetch(`${API_URL}/play/resign`, {
    method: 'POST',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      token: token
    })
  })

  const apiCode = resp.headers.get("api-code");

  if(apiCode === '0') {
    return (await resp.json()).correct;
  }

  return null;
}

export async function getHint(num: number, token: string): Promise<string | null> {
  const resp = await fetch(`${API_URL}/play/hint?num=${num}&token=${token}`, {
    method: "GET",
    credentials: 'include'
  });

  const apiCode = resp.headers.get("api-code");

  if(apiCode === '0') {
    return (await resp.json())['hint'];
  }

  return null;
}
