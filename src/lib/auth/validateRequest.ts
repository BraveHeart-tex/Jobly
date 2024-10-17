import { lucia } from "@/lib/auth/index";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";

type SessionValidationResult =
  | { user: User; session: Session }
  | { user: null; session: null };

export const validateRequest = async (): Promise<SessionValidationResult> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(sessionId);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } else {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // next.js throws when you attempt to set cookie when rendering page
  }
  return result;
};
