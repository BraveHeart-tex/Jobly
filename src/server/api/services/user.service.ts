import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const getUserByEmail = async (email: string) => {
  return db.select().from(user).where(eq(user.email, email));
};

export const getUserById = async (id: number) => {
  return db.select().from(user).where(eq(user.id, id));
};
