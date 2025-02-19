import bcrypt from "bcrypt";
import { pool } from "../app";
import { is2FAtokenValid } from "./2fa";
import { decryptUserCookie, UserCookie } from "./user-cookies";

interface UserCredentials {
  uid: string;
  passwd: string;
  token2FA?: string;
}

export enum CheckResult {
  CORRECT,
  TOKEN_2FA_REQUIRED,
  INVALID_2FA_TOKEN,
  INVALID_LOGIN,
  INVALID_PASSWD,
  INVALID_CONTENT,
}

export function decryptUserCredentials(hash: string): UserCredentials | null {
  try {
    const {
      uid,
      registered: { passwd },
    } = decryptUserCookie(hash) as UserCookie;

    return {
      uid,
      passwd,
    };
  } catch (err) {
    return null;
  }
}

export async function checkUserCredentialsEncrypted(
  hash: string
): Promise<CheckResult> {
  const credentials = decryptUserCredentials(hash);
  if (credentials === null) {
    return CheckResult.INVALID_CONTENT;
  }
  return await checkUserCredentials(credentials);
}

export async function checkUserCredentials(
  credentials: UserCredentials
): Promise<CheckResult> {
  const { uid, passwd } = credentials;

  const dbRes = await pool.query(
    `
    SELECT passwd FROM users WHERE id = $1
    `,
    [uid]
  );

  if (dbRes.rows.length === 0) {
    return CheckResult.INVALID_LOGIN;
  }

  const passwdHash = dbRes.rows[0].passwd;

  const isPasswdCorrect = await bcrypt.compare(passwd, passwdHash);

  return isPasswdCorrect ? CheckResult.CORRECT : CheckResult.INVALID_PASSWD;
}

export async function checkUserCredentialsForLogin(
  credentials: UserCredentials
): Promise<CheckResult> {
  const { uid, passwd, token2FA } = credentials;

  const dbRes = await pool.query(
    `
    SELECT passwd, is_2fa, secret_2fa FROM users WHERE id = $1
  `,
    [uid]
  );

  if (dbRes.rows.length === 0) {
    return CheckResult.INVALID_LOGIN;
  }

  const passwdHash = dbRes.rows[0].passwd;
  const is2FA = dbRes.rows[0].is_2fa;
  const secret2FA = dbRes.rows[0].secret_2fa;

  const isPasswdCorrect = await bcrypt.compare(passwd, passwdHash);
  
  if (!isPasswdCorrect) {
    return CheckResult.INVALID_PASSWD;
  }
  if (!is2FA) {
    return CheckResult.CORRECT;
  }

  if (!token2FA) {
    return CheckResult.TOKEN_2FA_REQUIRED;
  }
  if (is2FAtokenValid(secret2FA, token2FA)) {
    return CheckResult.CORRECT;
  }
  return CheckResult.INVALID_2FA_TOKEN;
}
