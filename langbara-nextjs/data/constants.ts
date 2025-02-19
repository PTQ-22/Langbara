import { strings } from "./strings";

const env = process.env.NODE_ENV;

let siteKey = "";
let apiUrl = "";
let internalUrl = "";

if(env === "development") {
  siteKey="10000000-ffff-ffff-ffff-000000000001";
  apiUrl="http://localhost:8000/api/v1"
  internalUrl="http://localhost:8000/internal/v1"
} else if(env === "production") {
  siteKey="e778ffd6-5d0b-4312-b579-294768ca9bf6"
  apiUrl="https://langbara.pl/api/v1"
  internalUrl="http://localhost:8000/internal/v1"
}

export const HCAPTCHA_SITE_KEY=siteKey;
export const API_URL=apiUrl;
export const INTERNAL_URL=internalUrl;

// fucking timezones
export const POLISH_TIMEZONE_OFFSET = 3600000;

// play menu
export const PLAY_MENU_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
export const PLAY_MENU_MODES = ["unlimited", "daily"];
export const MODES_ARRAY: Array<{
  first: string;
  second: string;
  desc: string;
}> = [
  { first: "UNLIMITED", second: "WORDS", desc: strings.unlimitedQuestionDesc },
  { first: "DAILY", second: "QUESTION", desc: strings.dailyQuestionDesc },
];
export enum PlayMode {
  UNLIMITED,
  DAILY,
}

// sidebar
interface SideBarElem {
  name: string;
  icon: string;
  href: string;
  loginRequired: boolean;
}
export const SIDEBAR_ELEMENTS: SideBarElem[] = [
  {
    name: "GRAJ",
    icon: "menu",
    href: "/play",
    loginRequired: false,
  },
  {
    name: "KONTO",
    icon: "account",
    href: "/user/account",
    loginRequired: true,
  },
  // {
  //   name: "ZNAJOMI",
  //   icon: 'friends',
  //   href: '/friends',
  //   loginRequired: true
  // },
  {
    name: "TOPKA",
    icon: "stats",
    href: "/top",
    loginRequired: false,
  },
  {
    name: "USTAWIENIA",
    icon: "settings",
    href: "/settings",
    loginRequired: false,
  },
  {
    name: "O PROJEKCIE",
    icon: "home",
    href: "/home",
    loginRequired: false,
  },
];
