import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import userSkills, {
  type InsertUserSkillModel,
} from "@/server/db/schema/userSkills";

export const createUserSkill = async (
  data: InsertUserSkillModel,
  trx?: Transaction,
): Promise<number | undefined> => {
  const dbLayer = trx || db;

  const [result] = await dbLayer.insert(userSkills).values(data).$returningId();

  return result?.id;
};
