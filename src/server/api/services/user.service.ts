import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.email, email),
  });
};

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.id, id),
  });
};
