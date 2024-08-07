"use server";

// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { createHash } from "node:crypto";
import { lucia } from "@/lib/auth/index";
import { PASSWORD_STRENGTH_LEVELS } from "@/lib/constants";
import type { User } from "@/server/db/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import zxcvbn from "zxcvbn";
import { SHARED_ROUTES } from "../routes";
import { validateRequest } from "./validate-request";

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
      strengthMessage =
        "Moderate password. Consider adding more characters and avoiding common words.";
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

export const createSessionWithUserId = async (userId: User["id"]) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const signOut = async () => {
  const { session, user } = await validateRequest();
  if (!session) {
    return redirect(SHARED_ROUTES.LOGIN);
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  const portalType = user.role;
  return redirect(`${SHARED_ROUTES.LOGIN}?portalType=${portalType}`);
};

export const validateRequestByRole = async (allowedRoles: User["role"][]) => {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    return redirect(SHARED_ROUTES.LOGIN);
  }

  if (!allowedRoles.includes(user.role)) {
    return redirect(SHARED_ROUTES.HOME);
  }

  return { user, session };
};
