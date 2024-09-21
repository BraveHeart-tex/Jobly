import type { InferSelectModel } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";
import skills from "./skills";

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

export type UserSkill = InferSelectModel<typeof userSkills>;

export default userSkills;
