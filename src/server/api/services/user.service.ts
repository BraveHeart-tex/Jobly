import { db } from "@/server/db";
import type { DBUser } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.email, email),
  });
};

export const getUserById = async (id: DBUser["id"]) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.id, id),
  });
};
