import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

const users = mysqlTable(
  "Users",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    email: varchar("email", {
      length: 255,
    })
      .unique()
      .notNull(),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    hashedPassword: varchar("hashedPassword", { length: 255 }).notNull(),
    role: mysqlEnum("role", ["employer", "candidate"]).notNull(),
  },
  (table) => {
    return {
      User_id: primaryKey({ columns: [table.id], name: "User_id" }),
      email: index("email").on(table.email),
    };
  },
);

export type DBUser = InferSelectModel<typeof users>;
export type DBUserInsertModel = InferInsertModel<typeof users>;

export default users;
