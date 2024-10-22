import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

import { type InferSelectModel, relations } from "drizzle-orm";
import { cities, countries, users, workExperiences } from "@/server/db/schema";

const userProfiles = mysqlTable(
  "UserProfiles",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId").references(() => users.id, {
      onDelete: "cascade",
    }),
    title: varchar("title", { length: 255 }),
    sector: varchar("sector", { length: 255 }),
    presentedWorkExperienceId: int("presentedWorkExperienceId").references(
      () => workExperiences.id,
      {
        onDelete: "set null",
      },
    ),
    countryId: int("countryId").references(() => countries.id, {
      onDelete: "set null",
    }),
    cityId: int("cityId").references(() => cities.id, {
      onDelete: "set null",
    }),
    websiteLink: varchar("websiteLink", { length: 255 }),
    websiteLinkText: varchar("websiteLinkText", { length: 255 }),
  },
  (table) => {
    return {
      UserProfile_id: primaryKey({
        columns: [table.id],
        name: "UserProfile_id",
      }),
      userId: index("userId").on(table.userId),
      countryId: index("countryId").on(table.countryId),
      cityId: index("cityId").on(table.cityId),
    };
  },
);

export type UserProfile = InferSelectModel<typeof userProfiles>;

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export default userProfiles;
