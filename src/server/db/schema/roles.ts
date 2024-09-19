import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import { int, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
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
    createdAt: customTimestamp("createdAt").$defaultFn(() =>
      getCurrentTimestamp(),
    ),
    updatedAt: customTimestamp("updatedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull()
      .$onUpdate(() => getCurrentTimestamp()),
  },
  (table) => {
    return {
      Role_id: primaryKey({ columns: [table.id], name: "Role_id" }),
    };
  },
);

export default roles;
