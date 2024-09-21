import { type InferSelectModel, relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import skills from "./skills";
import users from "./users";

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
    level: varchar("level", { length: 50 }).notNull(),
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
