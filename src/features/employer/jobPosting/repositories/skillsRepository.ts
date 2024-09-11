import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import type { SkillInsertModel } from "@/server/db/schema/skills";
import skills from "@/server/db/schema/skills";

export const skillsRepository = {
  async addSkills(data: SkillInsertModel[], transaction?: Transaction) {
    const dbLayer = transaction || db;
    return await dbLayer
      .insert(skills)
      .values(data)
      .onDuplicateKeyUpdate({
        set: buildConflictUpdateColumns(skills, ["name"]),
      })
      .$returningId();
  },
};
