import { env } from "@/env.js";
import { db } from "@/server/db";
import { type User, session, user } from "@/server/db/schema";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

type DatabaseUserAttributes = Pick<
  User,
  "id" | "email" | "role" | "firstName" | "lastName"
>;

const adapter = new DrizzleMySQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      role: attributes.role,
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
