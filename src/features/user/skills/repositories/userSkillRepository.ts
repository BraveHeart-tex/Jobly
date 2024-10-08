import { db } from "@/server/db";
import { userSkills } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";

export const userSkillRepository = {
  async createUserSkill({
    userId,
    skillId,
  }: { userId: number; skillId: number }): Promise<MySqlRawQueryResult> {
    return db.insert(userSkills).values({
      userId,
      skillId,
    });
  },

  async deleteUserSkill({
    userId,
    skillId,
  }: {
    userId: number;
    skillId: number;
  }): Promise<MySqlRawQueryResult> {
    return db
      .delete(userSkills)
      .where(
        and(eq(userSkills.userId, userId), eq(userSkills.skillId, skillId)),
      );
  },
};
