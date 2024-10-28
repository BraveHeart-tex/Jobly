import { ASYNC_SELECT_OPTIONS_LIMIT } from "@/lib/constants";
import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { SkillInsertModel } from "@/server/db/schema/skills";
import skills from "@/server/db/schema/skills";
import { like } from "drizzle-orm";

export const addSkills = async (
  data: SkillInsertModel[],
  transaction?: Transaction,
) => {
  const dbLayer = transaction || db;
  return await dbLayer.insert(skills).values(data).$returningId();
};

export const getSkillsByName = async (query: string) => {
  return await db
    .select()
    .from(skills)
    .where(like(skills.name, `%${query}%`))
    .limit(ASYNC_SELECT_OPTIONS_LIMIT);
};
