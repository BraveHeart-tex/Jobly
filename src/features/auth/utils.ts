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
import {
  formatLocation,
  getClientIp,
  getDeviceInfo,
  getLocationData,
} from "@/lib/auth/userAgent";
import { unCachedValidateRequest } from "@/lib/auth/validateRequest";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import type { DBUser } from "@/server/db/schema/users";
import { type Options, hash, verify } from "@node-rs/argon2";
import { cookies, headers } from "next/headers";
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
  hashedPassword: string | null,
  password: string,
) => {
  if (!hashedPassword) return false;
  return verify(hashedPassword, password, DEFAULT_HASH_OPTIONS);
};

export const createSessionWithUserId = async (userId: DBUser["id"]) => {
  const sessionToken = generateSessionToken();
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const deviceInfo = getDeviceInfo(userAgent);
  const clientIp = getClientIp(headersList);
  const locationData = await getLocationData(clientIp);
  const locationDataFormatted = formatLocation(locationData);

  const session = await createSession(sessionToken, userId, {
    deviceName: deviceInfo.deviceName,
    userId,
    browser: deviceInfo.browser,
    ipAddress: clientIp,
    location: locationDataFormatted,
    operatingSystem: deviceInfo.operatingSystem,
    deviceType: deviceInfo.deviceType,
  });

  setSessionTokenCookie(sessionToken, session.expiresAt);
};

export const signOut = async (role: "candidate" | "employer") => {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value ?? null;
  if (!sessionId) return;

  deleteSessionTokenCookie();

  invalidateSession(sessionId);

  redirect(`${SHARED_ROUTES.LOGIN}?portalType=${role}`);
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
