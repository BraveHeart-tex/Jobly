import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import companies from "./companies";
import roles from "./roles";
import users from "./users";

const userRoles = mysqlTable(
  "UserRoles",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    roleId: int("roleId")
      .references(() => roles.id)
      .notNull(),
    companyId: int("companyId").references(() => companies.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      UserRoles_id: primaryKey({ columns: [table.id], name: "UserRoles_id" }),
      userId: index("userId").on(table.userId),
      roleId: index("roleId").on(table.roleId),
      companyId: index("companyId").on(table.companyId),
    };
  },
);

export default userRoles;
