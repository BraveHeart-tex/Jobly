import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import type { InsertUserSkillEducationalBackgroundModel } from "@/server/db/schema/userSkillEducationalBackgrounds";
import userSkillEducationalBackgrounds from "@/server/db/schema/userSkillEducationalBackgrounds";
import { eq } from "drizzle-orm";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";

export const createUserSkillEducationalBackgrounds = async (
  data: InsertUserSkillEducationalBackgroundModel[],
  trx?: Transaction,
): Promise<MySqlRawQueryResult> => {
  const dbLayer = trx || db;
  return await dbLayer
    .insert(userSkillEducationalBackgrounds)
    .values(data)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(userSkillEducationalBackgrounds, [
        "userSkillId",
      ]),
    });
};

export const deleteUserSkillEducationalBackgrounds = async (
  userSkillId: number,
  trx?: Transaction,
) => {
  const dbLayer = trx || db;

  return await dbLayer
    .delete(userSkillEducationalBackgrounds)
    .where(eq(userSkillEducationalBackgrounds.userSkillId, userSkillId));
};
