import { env } from "@/env";
import type { DBUser } from "@/server/db/schema/users";
import { Google } from "arctic";
import crypto from "node:crypto";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI,
);

export const generateStateWithUserRole = (userType: DBUser["role"]) => {
  const randomToken = crypto.randomBytes(32).toString("hex");
  const stateObj = {
    userType,
    token: randomToken,
    timestamp: Date.now(),
  };

  return Buffer.from(JSON.stringify(stateObj)).toString("base64");
};

export const validateState = (state: string) => {
  try {
    const stateObj = JSON.parse(Buffer.from(state, "base64").toString());

    const isValid = Date.now() - stateObj.timestamp < 3600000; // 1 hour expiry

    if (!isValid) {
      return {
        isValid: false,
        error: "State has expired",
      };
    }

    return {
      isValid: true,
      userType: stateObj.userType,
      token: stateObj.token,
    };
  } catch (error) {
    return {
      isValid: false,
      error: (error as Error).message,
    };
  }
};
