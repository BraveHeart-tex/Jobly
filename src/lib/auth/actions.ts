"use server";

import { createHash } from "crypto";
import zxcvbn from "zxcvbn";
import { PASSWORD_STRENGTH_LEVELS } from "@/lib/constants";

async function hashPasswordSHA1(password: string): Promise<string> {
  return createHash("sha1").update(password).digest("hex").toUpperCase();
}

export const checkPasswordPwned = async (password: string) => {
  const sha1Hash = await hashPasswordSHA1(password);
  const prefix = sha1Hash.substring(0, 5);
  const suffix = sha1Hash.slice(5);

  const url = `https://api.pwnedpasswords.com/range/${prefix}`;
  const response = await fetch(url);
  const data = await response.text();

  const hashes = data.split("\r\n").map((line: string) => line.split(":"));

  for (const [hashSuffix] of hashes) {
    if (hashSuffix?.toUpperCase() === suffix) {
      return true;
    }
  }

  return false;
};

export const checkPasswordStrength = async (password: string) => {
  const result = zxcvbn(password);

  // Provide feedback based on the score
  let strengthMessage = "";

  switch (result.score) {
    case PASSWORD_STRENGTH_LEVELS.VERY_WEAK:
    case PASSWORD_STRENGTH_LEVELS.WEAK:
      strengthMessage =
        "Weak password. Consider using a longer password with a mix of letters, numbers, and special characters.";
      break;
    case PASSWORD_STRENGTH_LEVELS.MODERATE:
      strengthMessage = "Moderate password. Consider adding more characters and avoiding common words.";
      break;
    case PASSWORD_STRENGTH_LEVELS.STRONG:
      strengthMessage = "Strong password. This should be safe for most uses.";
      break;
    case PASSWORD_STRENGTH_LEVELS.VERY_STRONG:
      strengthMessage = "Very strong password. Excellent choice!";
      break;
  }

  return {
    score: result.score,
    feedback: result.feedback,
    suggestions: result.feedback.suggestions,
    message: strengthMessage,
  };
};
