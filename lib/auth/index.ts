import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "@/lib/db";
import { session, user } from "@/lib/db/schema";
import { Lucia } from "lucia";

const adapter = new DrizzleMySQLAdapter(db, session, user);

const lucia = new Lucia(adapter, {
  getUserAttributes: (user) => {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  firstName: string;
  lastName: string;
}
