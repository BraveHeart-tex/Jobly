import {
  type InferSelectModel,
  relations,
  type InferInsertModel,
} from "drizzle-orm";
import {
  date,
  decimal,
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
    fieldOfStudy: varchar("fieldOfStudy", {
      length: 255,
    }).notNull(),
    gpa: decimal("gpa", {
      precision: 10,
      scale: 2,
    }),
    startDate: date("startDate", {
      mode: "string",
    }).notNull(),
    endDate: date("endDate", {
      mode: "string",
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

export type InsertEducationalBackgroundModel = InferInsertModel<
  typeof educationalBackgrounds
>;

export default educationalBackgrounds;
