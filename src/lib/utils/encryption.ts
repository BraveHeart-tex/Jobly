import crypto from "crypto";
const ALGORITHM = "aes-256-cbc";
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // AES block size

const deriveKey = (password: string) => {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 100000, KEY_LENGTH, "sha256");
  return { key, salt };
};

export const encrypt = (text: string, password: string) => {
  const { key, salt } = deriveKey(password);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
    encryptedData: encrypted,
  };
};

export const decrypt = (
  encryptedData: string,
  password: string,
  ivHex: string,
  saltHex: string,
) => {
  const salt = Buffer.from(saltHex, "hex");
  const key = crypto.pbkdf2Sync(password, salt, 100000, KEY_LENGTH, "sha256");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
