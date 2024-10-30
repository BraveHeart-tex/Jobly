import { users } from "@/server/db/schema";
import { relations } from "drizzle-orm";
import { boolean, index, int, mysqlTable } from "drizzle-orm/mysql-core";

const userEmailNotificationSettings = mysqlTable(
  "UserEmailNotificationSettings",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    enabled: boolean("enabled").default(false),
    jobAlerts: boolean("jobAlerts").default(false),
    suitableJobPostings: boolean("suitableJobPostings").default(false),
    followedJobPostingClosingDates: boolean(
      "followedJobPostingClosingDates",
    ).default(false),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
    };
  },
);

export const userEmailNotificationSettingsRelations = relations(
  userEmailNotificationSettings,
  ({ one }) => ({
    user: one(users, {
      fields: [userEmailNotificationSettings.userId],
      references: [users.id],
    }),
  }),
);

export default userEmailNotificationSettings;
