import { cookies } from "next/headers";
import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { google, validateState } from "@/lib/auth/oauth";
import {
  checkUserEmailAlreadyInUseByGoogleId,
  getUserFromGoogleId,
} from "@/actions/auth";
import { createSessionWithUserId } from "@/features/auth/utils";
import { parseEnumValue } from "@/schemas/schemaUtils";
import { users } from "@/server/db/schema";
import { createUser } from "@/features/user/profile/data-access/users";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier =
    cookieStore.get("google_oauth_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    console.info("missing params");
    return new Response(null, {
      status: 400,
    });
  }

  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  const validatedState = validateState(state);

  if (!validatedState.isValid) {
    console.info("invalid state");
    return new Response(null, {
      status: 400,
    });
  }

  const userType = parseEnumValue(
    users.role.enumValues,
    validatedState.userType,
    "candidate",
  );

  console.info("userType", userType);

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch {
    console.info("invalid code");
    // invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }

  const claims = decodeIdToken(tokens.idToken()) as {
    sub: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
  };

  const googleUserId = claims.sub;
  const googleUserEmail = claims.email;
  const userPictureUrl = claims.picture;

  const emailAlreadyInUse = await checkUserEmailAlreadyInUseByGoogleId(
    googleUserEmail,
    googleUserId,
  );

  if (emailAlreadyInUse) {
    return new Response(null, {
      status: 400,
      headers: {
        Location: "/?emailAlreadyInUse=true",
      },
    });
  }

  const existingUser = await getUserFromGoogleId(googleUserId);

  if (existingUser) {
    await createSessionWithUserId(existingUser.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const userId = await createUser({
    email: googleUserEmail,
    firstName: claims.given_name,
    lastName: claims.family_name,
    role: userType,
    avatarUrl: userPictureUrl,
    googleId: googleUserId,
  });

  if (!userId) {
    return new Response(null, {
      status: 500,
    });
  }

  await createSessionWithUserId(userId);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
