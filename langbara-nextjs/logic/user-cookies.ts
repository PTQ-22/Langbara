import type { NextPageContext } from "next";
import nookies from "nookies";
import { API_URL, INTERNAL_URL, POLISH_TIMEZONE_OFFSET } from "../data/constants";

export enum AccountType {
  UNREGISTERED = 0,
  REGISTERED = 1,
}

export enum LanguageLevel {
  A1,
  A2,
  B1,
  B2,
  C1,
  C2,
}

export interface UserCookie {
  uid: string;
  version: number;
  account_type: AccountType;
  language_level: LanguageLevel | null;
  points: number;
  streak: number;
  daily: {
    last_game_date: Date;
  },
  registered: {
    display_name: string;
    passwd: string;
  };
}

export async function initCookies(ctx: NextPageContext): Promise<UserCookie> {
  const cookies = nookies.get(ctx, {path: '/'});

  let cookie = cookies["auth"] || -1;
  
  if (ctx.query.auth) {
    cookie = ctx.query.auth as string;
  }

  if (cookie === -1) {
    // create new cookie
    let resp = await fetch(`${INTERNAL_URL}/cookies/new`);
    let json = await resp.json();
    setUserCookie(json['auth'], ctx)
    cookie = json["auth"];
  }

  let resp = await fetch(`${INTERNAL_URL}/cookies/get?cookie=${cookie}`);
  let json = await resp.json();

  if(json.msg !== 'OK') {
    resp = await fetch(`${INTERNAL_URL}/cookies/new`);
    json = await resp.json();
    setUserCookie(json['auth'], ctx)
    cookie = json["auth"];

    resp = await fetch(`${INTERNAL_URL}/cookies/get?cookie=${cookie}`);
    json = await resp.json();
  }
  
  return json as UserCookie;
}

interface UserIs2FA {
  is2FA?: boolean | null;
}

export async function getUser2FAData(
  ctx: NextPageContext
): Promise<UserIs2FA | null> {
  const cookies = nookies.get(ctx);

  let userAuth = cookies["auth"] || -1;

  // if (ctx.query.adminauth) {
  //   userAuth = ctx.query.adminauth as string;
  // }

  if (userAuth === -1) {
    return {
      is2FA: undefined,
    };
  }

  const resp = await fetch(`${API_URL}/user/2fa?authcookie=${userAuth}`);

  const json = await resp.json();

  if (json.is2FA === undefined) {
    return null;
  }

  return {
    is2FA: json.is2FA,
  };
}

export function setUserCookie(cookieValue: string, ctx: NextPageContext | undefined = undefined) {
  const now = new Date();
  now.setTime(now.getTime() + 365 * 24 * 3600 * 1000);

  nookies.set(ctx, 'auth', cookieValue, {path: '/', expires: now});
}

export function hasUserAnsweredTodayDaily(userData: UserCookie) {
  const lastUserDailyDate = new Date(userData.daily.last_game_date);

  const userDay = lastUserDailyDate.getUTCDate();
  const userMonth = lastUserDailyDate.getUTCMonth() + 1;
  const userYear = lastUserDailyDate.getUTCFullYear();

  const now = new Date();
  
  now.setTime(now.getTime() - now.getTimezoneOffset() * 60 * 1000 + POLISH_TIMEZONE_OFFSET);

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return userDay === day && userMonth === month && userYear === year;
}