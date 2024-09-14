import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { SkillInsertModel } from "@/server/db/schema/skills";
import skills from "@/server/db/schema/skills";
import { like } from "drizzle-orm";

export const skillsRepository = {
  async addSkills(data: SkillInsertModel[], transaction?: Transaction) {
    const dbLayer = transaction || db;
    return await dbLayer.insert(skills).values(data).$returningId();
  },
  async getSkillsByName(query: string) {
    return await db
      .select()
      .from(skills)
      .where(like(skills.name, `%${query}%`))
      .limit(10);
  },
};
