import { type InferSelectModel, relations } from "drizzle-orm";
import {
  date,
  index,
  int,
  mysqlTable,
  text,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";

const personalDetails = mysqlTable(
  "PersonalDetails",
  {
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    phoneNumber: varchar("phoneNumber", { length: 20 }),
    country: varchar("country", { length: 100 }),
    city: varchar("city", { length: 100 }),
    address: text("address"),
    postalCode: varchar("postalCode", { length: 20 }),
    drivingLicense: varchar("drivingLicense", { length: 50 }),
    placeOfBirth: varchar("placeOfBirth", { length: 100 }),
    dateOfBirth: date("dateOfBirth", { mode: "string" }),
    professionalSummary: text("professionalSummary"),
  },
  (table) => {
    return {
      PersonalDetail_User_id: index("PersonalDetail_User_id").on(table.userId),
      PersonalDetail_User_id_unique: unique("PersonalDetail_User_id_unique").on(
        table.userId,
      ),
    };
  },
);

export const personalDetailsRelations = relations(
  personalDetails,
  ({ one }) => ({
    user: one(users, {
      fields: [personalDetails.userId],
      references: [users.id],
    }),
  }),
);

export type PersonalDetail = InferSelectModel<typeof personalDetails>;
export default personalDetails;
