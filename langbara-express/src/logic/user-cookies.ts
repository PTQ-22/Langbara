import { pool } from "../app";
import { decryptString, encryptString } from "./crypto-wrapper";
import { copyof } from './utils';

export const COOKIE_TEMPLATE_VERSION = 1;

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
  daily: {
    last_game_date: Date
  },
  points: number;
  streak: number;
  registered: {
    display_name: string;
    passwd: string;
  };
}

const DEFAULT_REGISTERED_BLOCK = {
  passwd: "",
  display_name: ""
};

export const DEFAULT_USER_COOKIE: UserCookie = {
  version: COOKIE_TEMPLATE_VERSION,
  uid: "PLEASE ADD ME",
  language_level: null,
  daily: { last_game_date: new Date(0) },
  account_type: AccountType.UNREGISTERED,
  points: 0,
  streak: 0,
  registered: DEFAULT_REGISTERED_BLOCK,
};

export function encryptUserCookie(cookie: UserCookie) {
  const str = JSON.stringify(cookie);
  return encryptString(str);
}

export function newEncryptedUserCookie(uid: string) {
  const cookie = copyof(DEFAULT_USER_COOKIE);
  cookie.uid = uid;
  return encryptUserCookie(cookie);
}

export function decryptUserCookie(hash: string): UserCookie | undefined {
  try {
    const str = decryptString(hash);

    const parsed = JSON.parse(str) as UserCookie;

    return parsed;
  } catch (err) {
    return undefined;
  }
}

export function register(userCookie: UserCookie, displayName: string, passwd: string) {
  userCookie.account_type = AccountType.REGISTERED;
  userCookie.registered.display_name = displayName;
  userCookie.registered.passwd = passwd;
  return userCookie;
}
