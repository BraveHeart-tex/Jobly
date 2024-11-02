import users from "@/server/db/schema/users";
import { relations } from "drizzle-orm";
import { boolean, index, int, mysqlTable } from "drizzle-orm/mysql-core";

const candidateNotificationSettings = mysqlTable(
  "CandidateNotificationSettings",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, { onDelete: "cascade" })
      .unique()
      .notNull(),
    jobRecommendations: boolean("jobRecommendations").notNull().default(true),
    applicationStatus: boolean("applicationStatus").notNull().default(true),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
    };
  },
);

export const candidateNotificationSettingsRelations = relations(
  candidateNotificationSettings,
  ({ one }) => ({
    user: one(users, {
      fields: [candidateNotificationSettings.userId],
      references: [users.id],
    }),
  }),
);

export default candidateNotificationSettings;
