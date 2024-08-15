import { sql } from "drizzle-orm";
import { datetime, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import permissions from "./permissions";
import users from "./users";

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
  createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
  updatedAt: datetime("updatedAt", { mode: "string" })
    .default(sql`(now())`)
    .notNull()
    .$onUpdate(() => sql`(now())`),
});

export default entityPermissions;
