import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

const skills = mysqlTable(
  "Skills",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  },
  (table) => {
    return {
      Skill_id: primaryKey({ columns: [table.id], name: "Skill_id" }),
      name: index("name").on(table.name),
    };
  },
);

export type SkillInsertModel = InferInsertModel<typeof skills>;
export type SkillSelectModel = InferSelectModel<typeof skills>;

export default skills;
