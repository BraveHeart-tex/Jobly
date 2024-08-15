import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import type { InferInsertModel } from "drizzle-orm/table";

export const signUp = async (data: InferInsertModel<typeof users>) => {
  const [response] = await db.insert(users).values(data).$returningId();
  return response?.id;
};
