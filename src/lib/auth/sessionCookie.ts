import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";

export const setSessionTokenCookie = (token: string, expiresAt: Date): void => {
  cookies().set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
};

export function deleteSessionTokenCookie(): void {
  cookies().set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
