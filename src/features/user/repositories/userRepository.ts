import { db } from "@/server/db";
import type { DBUser, DBUserInsertModel } from "@/server/db/schema/users";
import users from "@/server/db/schema/users";
import { eq } from "drizzle-orm";

export const userRepository = {
  async getUserByEmail(email: string) {
    return db.query.users.findFirst({
      where: (users) => eq(users.email, email),
    });
  },
  async getUserById(id: DBUser["id"]) {
    return db.query.users.findFirst({
      where: (users) => eq(users.id, id),
    });
  },
  async createUser(data: DBUserInsertModel) {
    const [response] = await db.insert(users).values(data).$returningId();
    return response?.id;
  },
  async deleteUserById(id: DBUser["id"]) {
    return db.delete(users).where(eq(users.id, id));
  },
};
