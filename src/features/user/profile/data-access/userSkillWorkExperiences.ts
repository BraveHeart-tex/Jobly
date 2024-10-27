import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { InsertUserSkillWorkExperienceModel } from "@/server/db/schema/userSkillWorkExperiences";
import userSkillWorkExperiences from "@/server/db/schema/userSkillWorkExperiences";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";

export const createUserSkillWorkExperiences = async (
  data: InsertUserSkillWorkExperienceModel[],
  trx?: Transaction,
): Promise<MySqlRawQueryResult> => {
  const dbLayer = trx || db;
  return await dbLayer.insert(userSkillWorkExperiences).values(data);
};
