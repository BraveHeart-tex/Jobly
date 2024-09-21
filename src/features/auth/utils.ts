"use server";
// biome-ignore lint/correctness/noNodejsModules:
import { createHash } from "node:crypto";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validateRequest";
import { SHARED_ROUTES } from "@/lib/routes";
import type { DBUser } from "@/server/db/schema/users";
import { type Options, hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DEFAULT_HASH_OPTIONS: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPasswordSHA1(password: string): Promise<string> {
  return createHash("sha1").update(password).digest("hex").toUpperCase();
}

export const checkPasswordStrength = async (password: string) => {
  let score = 0;
  let strengthMessage = "";

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (hasLowercase) score++;
  if (hasUppercase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChars) score++;

  switch (score) {
    case 0:
    case 1:
    case 2:
      strengthMessage =
        "Very weak password. Consider using a longer password with a mix of letters, numbers, and special characters.";
      break;
    case 3:
    case 4:
      strengthMessage =
        "Weak password. Adding more character types and length can improve it.";
      break;
    case 5:
      strengthMessage =
        "Moderate password. Adding more special characters or length will strengthen it.";
      break;
    case 6:
      strengthMessage = "Strong password. This should be safe for most uses.";
      break;
    case 7:
      strengthMessage = "Very strong password. Excellent choice!";
      break;
  }

  return {
    score,
    message: strengthMessage,
  };
};

export const hashPassword = async (password: string) => {
  return hash(password, DEFAULT_HASH_OPTIONS);
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
) => {
  return verify(hashedPassword, password, DEFAULT_HASH_OPTIONS);
};

export const createSessionWithUserId = async (userId: DBUser["id"]) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const signOut = async (role: DBUser["role"]) => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return;

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  await lucia.invalidateSession(sessionId);
  return redirect(`${SHARED_ROUTES.LOGIN}?portalType=${role}`);
};

export const validateRequestByRole = async (allowedRoles: DBUser["role"][]) => {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    return redirect(SHARED_ROUTES.LOGIN);
  }

  if (!allowedRoles.includes(user.role)) {
    return redirect(SHARED_ROUTES.HOME);
  }

  return { user, session };
};
