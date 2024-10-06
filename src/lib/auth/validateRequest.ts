import { lucia } from "@/lib/auth/index";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import {
  deleteFromCache,
  getFromCache,
  getSessionKey,
  getUserKey,
} from "../redis/redisService";

type SessionValidationResult =
  | { user: User; session: Session }
  | { user: null; session: null };

export const uncachedValidateRequest =
  async (): Promise<SessionValidationResult> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return { user: null, session: null };
    }

    const sessionResultFromCache = await getSessionFromCache(sessionId);
    if (sessionResultFromCache) {
      const { session } = sessionResultFromCache;
      await handleSessionCookie(session, sessionId);
      return sessionResultFromCache;
    }

    const result = await lucia.validateSession(sessionId);
    await handleSessionCookie(result?.session, sessionId);
    return result;
  };

const handleSessionCookie = async (
  session: Session | null,
  previousSessionId: string,
) => {
  try {
    if (session?.fresh) {
      createSessionCookie(session.id);
    }
    if (!session) {
      createBlankSessionCookie();
      await deleteFromCache(getSessionKey(previousSessionId));
    }
  } catch {
    // next.js throws when you attempt to set cookie when rendering page
  }
};

const createSessionCookie = (sessionId: string) => {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

const createBlankSessionCookie = () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

const getSessionFromCache = async (
  sessionId: string,
): Promise<SessionValidationResult> => {
  const session = await getFromCache(getSessionKey(sessionId));
  if (!session) {
    return { user: null, session: null };
  }

  const parsedSession: Session = JSON.parse(session);

  const user = await getFromCache(getUserKey(parsedSession.userId));

  if (!user) {
    return { user: null, session: null };
  }

  const parsedUser: User = JSON.parse(user);

  return {
    user: parsedUser,
    session: parsedSession,
  };
};

export const validateRequest = cache(uncachedValidateRequest);
