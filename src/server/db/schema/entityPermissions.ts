import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "@/server/db/schema";
import permissions from "@/server/db/schema/permissions";

const entityPermissions = mysqlTable("EntityPermissions", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("userId").references(() => users.id, {
    onDelete: "cascade",
  }),
  entityId: int("entityId").notNull(),
  entityType: varchar("entityType", { length: 255 }).notNull(),
  permissionId: int("permissionId")
    .references(() => permissions.id)
    .notNull(),
  createdAt: customTimestamp("createdAt").$defaultFn(() =>
    getCurrentTimestamp(),
  ),
  updatedAt: customTimestamp("updatedAt")
    .$defaultFn(() => getCurrentTimestamp())
    .notNull()
    .$onUpdate(() => getCurrentTimestamp()),
});

export default entityPermissions;
