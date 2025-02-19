import bcrypt from "bcrypt";
import { pool } from "../app";
import { is2FAtokenValid } from "./2fa";
import { decryptString, encryptString } from "./crypto-wrapper";

interface AdminCredentials {
  name: string;
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

export function decryptAdminCredentials(hash: string): AdminCredentials | null {
  try {
    const decrypted = decryptString(hash);
    return JSON.parse(decrypted);
  } catch (err) {
    return null;
  }
}

export function encryptAdminCredentials(credentials: AdminCredentials): string {
  return encryptString(JSON.stringify(credentials));
}

export async function checkAdminCredentialsEncrypted(
  hash: string
): Promise<CheckResult> {
  const credentials = decryptAdminCredentials(hash);
  if (credentials === null) {
    return CheckResult.INVALID_CONTENT;
  }
  return await checkAdminCredentials(credentials);
}

export async function checkAdminCredentials(
  credentials: AdminCredentials
): Promise<CheckResult> {
  const { name, passwd } = credentials;

  const dbRes = await pool.query(
    `
    SELECT passwd FROM admins WHERE name = $1
  `,
    [name]
  );

  if (dbRes.rows.length === 0) {
    return CheckResult.INVALID_LOGIN;
  }

  const passwdHash = dbRes.rows[0].passwd;

  const isPasswdCorrect = await bcrypt.compare(passwd, passwdHash);

  return isPasswdCorrect ? CheckResult.CORRECT : CheckResult.INVALID_PASSWD;
}

export async function checkAdminCredentialsForLogin(
  credentials: AdminCredentials
): Promise<CheckResult> {
  const { name, passwd, token2FA } = credentials;

  const dbRes = await pool.query(
    `
    SELECT passwd, is_2fa, secret_2fa FROM admins WHERE name = $1
  `,
    [name]
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
