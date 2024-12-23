import {
  skills,
  userHighlightedSkills,
  userSkillEducationalBackgrounds,
  userSkillWorkExperiences,
  users,
} from "@/server/db/schema";
import {
  type InferSelectModel,
  relations,
  type InferInsertModel,
} from "drizzle-orm";
import { index, int, mysqlTable, uniqueIndex } from "drizzle-orm/mysql-core";

const userSkills = mysqlTable(
  "UserSkills",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
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
    displayOrder: int("displayOrder"),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      skillId: index("skillId").on(table.skillId),
      User_Skill_Id: uniqueIndex("User_Skill_Id").on(
        table.userId,
        table.skillId,
      ),
    };
  },
);

export const userSkillsRelations = relations(userSkills, ({ one, many }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
  userSkillWorkExperiences: many(userSkillWorkExperiences),
  userSkillEducationalBackgrounds: many(userSkillEducationalBackgrounds),
  userHighlightedSkills: many(userHighlightedSkills),
}));

export type UserSkill = InferSelectModel<typeof userSkills>;
export type InsertUserSkillModel = InferInsertModel<typeof userSkills>;

export default userSkills;
