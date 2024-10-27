import { skills, users } from "@/server/db/schema";
import { type InferSelectModel, relations } from "drizzle-orm";
import { index, int, mysqlTable } from "drizzle-orm/mysql-core";

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
