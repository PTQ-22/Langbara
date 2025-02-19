import * as crypto from "crypto";

export interface Hash {
  iv: string;
  content: string;
}

const bytes = 16;
const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY || "";

export function encrypt(str: string): Hash {
  const iv = crypto.randomBytes(bytes);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
}

export function decrypt(hash: Hash) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
}

export function encryptString(str: string): string {
  const hash = encrypt(str);
  return hash.iv + hash.content;
}

export function decryptString(str: string): string {
  const h: Hash = {
    iv: str.substring(0, 32),
    content: str.substring(32),
  };

  return decrypt(h);
}

export function hashString(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex');
}