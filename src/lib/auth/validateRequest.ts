import { validateSessionToken } from "@/lib/auth/session";
import { deleteSessionTokenCookie } from "@/lib/auth/sessionCookie";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const validateRequest = cache(async () => {
  const sessionId = (await cookies()).get(AUTH_COOKIE_NAME)?.value ?? null;
  if (!sessionId)
    return {
      user: null,
      session: null,
    };

  const { user, session } = await validateSessionToken(sessionId);
  try {
    if (!session) {
      deleteSessionTokenCookie();
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }

  return { user, session };
});
