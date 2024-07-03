import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import type { InferInsertModel } from "drizzle-orm/table";

export const signUp = async (data: InferInsertModel<typeof user>) => {
  return db.insert(user).values(data);
};
