import { userSkills, workExperiences } from "@/server/db/schema";
import { relations } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

const userSkillWorkExperiences = mysqlTable(
  "UserSkillWorkExperiences",
  {
    userSkillId: int("userSkillId")
      .references(() => userSkills.id, { onDelete: "cascade" })
      .notNull(),
    workExperienceId: int("workExperienceId")
      .references(() => workExperiences.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      UserSkillWorkExperience_id: primaryKey({
        columns: [table.userSkillId, table.workExperienceId],
      }),
      userSkillId: index("userSkillId").on(table.userSkillId),
      workExperienceId: index("workExperienceId").on(table.workExperienceId),
    };
  },
);

export const userSkillWorkExperiencesRelations = relations(
  userSkillWorkExperiences,
  ({ one }) => ({
    userSkill: one(userSkills, {
      fields: [userSkillWorkExperiences.userSkillId],
      references: [userSkills.id],
    }),
    workExperience: one(workExperiences, {
      fields: [userSkillWorkExperiences.workExperienceId],
      references: [workExperiences.id],
    }),
  }),
);

export default userSkillWorkExperiences;
