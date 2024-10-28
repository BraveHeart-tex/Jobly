import { userSkills } from "@/server/db/schema";
import { relations } from "drizzle-orm";
import { int, mysqlTable, index } from "drizzle-orm/mysql-core";

const userHighlightedSkills = mysqlTable(
  "UserHighlightedSkills",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    userSkillId: int("userSkillId")
      .references(() => userSkills.id, {
        onDelete: "cascade",
      })
      .notNull(),
    order: int("order").notNull(),
  },
  (table) => {
    return {
      UserSkillId_index: index("UserSkillId_index").on(table.userSkillId),
    };
  },
);

export const userHighlightedSkillsRelations = relations(
  userHighlightedSkills,
  ({ one }) => ({
    userSkill: one(userSkills, {
      fields: [userHighlightedSkills.userSkillId],
      references: [userSkills.id],
    }),
  }),
);

export default userHighlightedSkills;
