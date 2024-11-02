import { users } from "@/server/db/schema";
import { type InferInsertModel, relations } from "drizzle-orm";
import { boolean, index, int, mysqlTable } from "drizzle-orm/mysql-core";

const userPrivacySettings = mysqlTable(
  "UserPrivacySettings",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    searchableProfile: boolean("searchableProfile").notNull().default(true),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
    };
  },
);

export type InsertUserPrivacySettingsModel = InferInsertModel<
  typeof userPrivacySettings
>;

export const userPrivacySettingsRelations = relations(
  userPrivacySettings,
  ({ one }) => ({
    user: one(users, {
      fields: [userPrivacySettings.userId],
      references: [users.id],
    }),
  }),
);

export default userPrivacySettings;
