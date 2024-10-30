import { TWO_FACTOR_AUTH_METHODS } from "@/lib/constants";
import { users } from "@/server/db/schema";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
} from "drizzle-orm/mysql-core";

const userSecuritySettings = mysqlTable(
  "UserSecuritySettings",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    enableTwoFactorAuth: boolean("enableTwoFactorAuth").default(false),
    twoFactorAuthMethod: mysqlEnum(
      "twoFactorAuthMethod",
      TWO_FACTOR_AUTH_METHODS,
    ),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
    };
  },
);

export const userSecuritySettingsRelations = relations(
  userSecuritySettings,
  ({ one }) => ({
    user: one(users, {
      fields: [userSecuritySettings.userId],
      references: [users.id],
    }),
  }),
);

export default userSecuritySettings;
