"use server";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";

export const setSessionTokenCookie = async (token: string, expiresAt: Date) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });
  } catch {}
};

export const deleteSessionTokenCookie = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    });
  } catch {}
};
