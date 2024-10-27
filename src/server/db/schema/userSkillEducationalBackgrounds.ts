import { educationalBackgrounds, userSkills } from "@/server/db/schema";
import { relations } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

const userSkillEducationalBackgrounds = mysqlTable(
  "UserSkillEducationalBackgrounds",
  {
    userSkillId: int("userSkillId")
      .references(() => userSkills.id, { onDelete: "cascade" })
      .notNull(),
    educationalBackgroundId: int("educationalBackgroundId")
      .references(() => educationalBackgrounds.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      UserSkillEducationalBackground_id: primaryKey({
        columns: [table.userSkillId, table.educationalBackgroundId],
      }),
      userSkillId: index("userSkillId").on(table.userSkillId),
      educationalBackgroundId: index("educationalBackgroundId").on(
        table.educationalBackgroundId,
      ),
    };
  },
);

export const userSkillEducationalBackgroundsRelations = relations(
  userSkillEducationalBackgrounds,
  ({ one }) => ({
    userSkill: one(userSkills, {
      fields: [userSkillEducationalBackgrounds.userSkillId],
      references: [userSkills.id],
    }),
    educationalBackground: one(educationalBackgrounds, {
      fields: [userSkillEducationalBackgrounds.educationalBackgroundId],
      references: [educationalBackgrounds.id],
    }),
  }),
);

export default userSkillEducationalBackgrounds;
