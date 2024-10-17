"use server";
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

export const signOut = async (role: "candidate" | "employer") => {
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
