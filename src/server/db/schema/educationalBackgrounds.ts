import { type InferSelectModel, relations } from "drizzle-orm";
import {
  date,
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";

const educationalBackgrounds = mysqlTable(
  "EducationalBackgrounds",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    school: varchar("school", {
      length: 255,
    }).notNull(),
    degree: varchar("degree", {
      length: 255,
    }).notNull(),
    startDate: date("startDate", {
      mode: "string",
    }).notNull(),
    endDate: date("endDate", {
      mode: "string",
    }),
    city: varchar("city", {
      length: 100,
    }),
    description: text("description"),
  },
  (table) => {
    return {
      EducationalBackground_id: primaryKey({ columns: [table.id] }),
      userId: index("userId").on(table.userId),
    };
  },
);

export const educationalBackgroundsRelations = relations(
  educationalBackgrounds,
  ({ one }) => ({
    user: one(users, {
      fields: [educationalBackgrounds.userId],
      references: [users.id],
    }),
  }),
);

export type EducationalBackground = InferSelectModel<
  typeof educationalBackgrounds
>;

export default educationalBackgrounds;
