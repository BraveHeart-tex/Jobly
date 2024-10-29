import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import type { InsertUserSkillEducationalBackgroundModel } from "@/server/db/schema/userSkillEducationalBackgrounds";
import userSkillEducationalBackgrounds from "@/server/db/schema/userSkillEducationalBackgrounds";
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
