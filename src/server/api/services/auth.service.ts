import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import type { InferInsertModel } from "drizzle-orm/table";

export const signUp = async (data: InferInsertModel<typeof users>) => {
	return db.insert(users).values(data);
};
