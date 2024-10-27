import {
  educationalBackgrounds,
  skills,
  users,
  workExperiences,
} from "@/server/db/schema";
import { type InferSelectModel, relations } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

const userSkills = mysqlTable(
  "UserSkills",
  {
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    skillId: int("skillId")
      .references(() => skills.id, {
        onDelete: "cascade",
      })
      .notNull(),
    attributedWorkExperienceId: int("attributedWorkExperienceId").references(
      () => workExperiences.id,
      {
        onDelete: "set null",
      },
    ),
    attributedEducationalBackgroundId: int(
      "attributedEducationalBackgroundId",
    ).references(() => educationalBackgrounds.id, {
      onDelete: "set null",
    }),
    displayOrder: int("displayOrder"),
  },
  (table) => {
    return {
      UserSkill_id: primaryKey({ columns: [table.userId, table.skillId] }),
      userId: index("userId").on(table.userId),
      skillId: index("skillId").on(table.skillId),
    };
  },
);

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
}));

export type UserSkill = InferSelectModel<typeof userSkills>;

export default userSkills;
