import speakeasy from "speakeasy";

export enum AccountType2FA {
  ADMIN,
  USER,
}

export const generateNew2FAsecret = (accountType: AccountType2FA) => {
  return speakeasy.generateSecret({
    name: `Langbara ${accountType === AccountType2FA.ADMIN ? `(admin)` : ""}`,
  });
};

export const is2FAtokenValid = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
    window: 2,
  });
};
