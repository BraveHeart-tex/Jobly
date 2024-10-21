import { env } from "@/env.js";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { db } from "@/server/db";
import { sessions, users } from "@/server/db/schema";
import type { DBUser } from "@/server/db/schema/users";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

interface DatabaseUserAttributes
  extends Pick<
    DBUser,
    "id" | "email" | "role" | "firstName" | "lastName" | "avatarUrl"
  > {}

export interface CtxUserAttributes extends DatabaseUserAttributes {
  hasToSetupCompanyInformation?: boolean;
  companyId?: number;
}

const adapter = new DrizzleMySQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      role: attributes.role,
      avatarUrl: attributes?.avatarUrl,
    };
  },
  sessionCookie: {
    name: AUTH_COOKIE_NAME,
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
