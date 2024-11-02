import sessions from "@/server/db/schema/sessions";
import users from "@/server/db/schema/users";
import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import { index, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

const deviceSessions = mysqlTable(
  "DeviceSessions",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    sessionId: varchar("sessionId", { length: 255 })
      .references(() => sessions.id, {
        onDelete: "cascade",
      })
      .unique()
      .notNull(),
    deviceName: varchar("deviceName", { length: 255 }).notNull(),
    browser: varchar("browser", { length: 255 }),
    operatingSystem: varchar("operatingSystem", { length: 255 }),
    lastActive: customTimestamp("lastActive").$defaultFn(() =>
      getCurrentTimestamp(),
    ),
    deviceType: varchar("deviceType", { length: 255 }),
    ipAddress: varchar("ipAddress", { length: 45 }),
    location: text("location"),
  },
  (table) => {
    return {
      userId: index("user_id").on(table.userId),
      sessionId: index("session_id").on(table.sessionId),
    };
  },
);

export type InsertDeviceSessionModel = InferInsertModel<typeof deviceSessions>;
export type SelectDeviceSessionModel = InferSelectModel<typeof deviceSessions>;

export const deviceSessionsRelations = relations(deviceSessions, ({ one }) => ({
  user: one(users, {
    fields: [deviceSessions.userId],
    references: [users.id],
  }),
}));

export default deviceSessions;
