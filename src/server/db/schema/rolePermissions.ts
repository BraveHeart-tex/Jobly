import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import permissions from "./permissions";
import roles from "./roles";

const rolePermissions = mysqlTable(
  "RolePermissions",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    roleId: int("roleId")
      .references(() => roles.id, {
        onDelete: "cascade",
      })
      .notNull(),
    permissionId: int("permissionId")
      .references(() => permissions.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      RolePermission_id: primaryKey({
        columns: [table.id],
        name: "RolePermission_id",
      }),
      roleId: index("roleId").on(table.roleId),
      permissionId: index("permissionId").on(table.permissionId),
    };
  },
);

export default rolePermissions;
