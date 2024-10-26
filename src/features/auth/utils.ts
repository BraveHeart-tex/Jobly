"use server";
import {
  createSession,
  generateSessionToken,
  invalidateSession,
} from "@/lib/auth/session";
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "@/lib/auth/sessionCookie";
import { unCachedValidateRequest } from "@/lib/auth/validateRequest";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
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
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, userId);

  setSessionTokenCookie(sessionToken, session.expiresAt);
};

export const signOut = async (role: "candidate" | "employer") => {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value ?? null;
  if (!sessionId) return;

  deleteSessionTokenCookie();

  await invalidateSession(sessionId);

  return redirect(`${SHARED_ROUTES.LOGIN}?portalType=${role}`);
};

export const validateRequestByRole = async (allowedRoles: DBUser["role"][]) => {
  const { session, user } = await unCachedValidateRequest();
  if (!session || !user) {
    return redirect(SHARED_ROUTES.LOGIN);
  }

  if (!allowedRoles.includes(user.role)) {
    return redirect(SHARED_ROUTES.HOME);
  }

  return { user, session };
};
