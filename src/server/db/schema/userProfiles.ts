import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";
import countries from "./countries";

const userProfiles = mysqlTable(
  "UserProfiles",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId").references(() => users.id, {
      onDelete: "cascade",
    }),
    title: varchar("title", { length: 255 }),
    sector: varchar("sector", { length: 255 }),
    presentedSchoolId: int("presentedSchoolId"),
    countryId: int("countryId").references(() => countries.id, {
      onDelete: "cascade",
    }),
    cityId: int("cityId"),
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

export default userProfiles;
