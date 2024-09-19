import { sql } from "drizzle-orm";
import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";

const roles = mysqlTable(
  "Roles",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    description: varchar("description", { length: 512 }).notNull(),
    createdBy: int("createdBy")
      .references(() => users.id)
      .notNull(),
    updatedBy: int("updatedBy").references(() => users.id),
    createdAt: timestamp("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull()
      .$onUpdate(() => sql`(now())`),
  },
  (table) => {
    return {
      Role_id: primaryKey({ columns: [table.id], name: "Role_id" }),
    };
  },
);

export default roles;
