import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

const schools = mysqlTable(
  "Schools",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      School_id: primaryKey({ columns: [table.id], name: "School_id" }),
      name: index("name").on(table.name),
    };
  },
);

export default schools;
