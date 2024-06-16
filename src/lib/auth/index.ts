import { env } from "@/env.js";
import { db } from "@/server/db";
import { session, user } from "@/server/db/schema";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

type DatabaseUserAttributes = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

const adapter = new DrizzleMySQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
    };
  },
  sessionCookie: {
    name: "jbly_session",
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
