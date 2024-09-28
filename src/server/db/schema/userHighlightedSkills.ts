import { skills, users } from "@/server/db/schema/index";
import { relations } from "drizzle-orm";
import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

const userHighlightedSkills = mysqlTable(
  "UserHighlightedSkills",
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
    order: int("order").notNull(),
  },
  (table) => {
    return {
      UserHighlightedSkill_Id: primaryKey({
        columns: [table.userId, table.skillId],
      }),
    };
  },
);

export const userHighlightedSkillsRelations = relations(
  userHighlightedSkills,
  ({ one }) => ({
    user: one(users, {
      fields: [userHighlightedSkills.userId],
      references: [users.id],
    }),
    skill: one(skills, {
      fields: [userHighlightedSkills.skillId],
      references: [skills.id],
    }),
  }),
);

export default userHighlightedSkills;
