import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import type { InsertUserSkillWorkExperienceModel } from "@/server/db/schema/userSkillWorkExperiences";
import userSkillWorkExperiences from "@/server/db/schema/userSkillWorkExperiences";
import { eq } from "drizzle-orm";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";

export const createUserSkillWorkExperiences = async (
  data: InsertUserSkillWorkExperienceModel[],
  trx?: Transaction,
): Promise<MySqlRawQueryResult> => {
  const dbLayer = trx || db;
  return await dbLayer
    .insert(userSkillWorkExperiences)
    .values(data)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(userSkillWorkExperiences, [
        "userSkillId",
      ]),
    });
};

export const deleteUserSkillWorkExperiences = async (
  userSkillId: number,
  trx?: Transaction,
) => {
  const dbLayer = trx || db;

  return await dbLayer
    .delete(userSkillWorkExperiences)
    .where(eq(userSkillWorkExperiences.userSkillId, userSkillId));
};
