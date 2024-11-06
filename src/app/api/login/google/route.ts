import { env } from "@/env";
import { generateStateWithUserRole, google } from "@/lib/auth/oauth";
import { users } from "@/server/db/schema";
import { parseEnumValue } from "@/validation/schemaUtils";
import { generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const role = parseEnumValue(
    users.role.enumValues,
    requestUrl.searchParams.get("role") ?? "",
    "candidate",
  );
  const state = generateStateWithUserRole(role);
  const codeVerifier = generateCodeVerifier();
  const authorizationUrl = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);
  authorizationUrl.searchParams.append("role", role);

  const cookieStore = await cookies();
  cookieStore.set("google_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookieStore.set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizationUrl.toString(),
    },
  });
}
