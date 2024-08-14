import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

const permissions = mysqlTable(
  "Permissions",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    permissionName: varchar("permissionName", {
      length: 512,
    }).notNull(),
  },
  (table) => {
    return {
      Permission_id: primaryKey({ columns: [table.id], name: "Permission_id" }),
      permissionName: index("permissionName").on(table.permissionName),
    };
  },
);

export default permissions;
