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

const workExperiences = mysqlTable(
  "WorkExperiences",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    jobTitle: varchar("jobTitle", {
      length: 255,
    }).notNull(),
    employer: varchar("employer", {
      length: 255,
    }),
    startDate: date("startDate", {
      mode: "string",
    }).notNull(),
    endDate: date("endDate", {
      mode: "string",
    }),
    location: varchar("location", {
      length: 255,
    }),
    description: text("description"),
  },
  (table) => {
    return {
      WorkExperience_id: primaryKey({
        columns: [table.id],
        name: "WorkExperience_id",
      }),
      userId: index("userId").on(table.userId),
    };
  },
);

export const workExperienceRelations = relations(
  workExperiences,
  ({ one }) => ({
    user: one(users, {
      fields: [workExperiences.userId],
      references: [users.id],
    }),
  }),
);

export type WorkExperience = InferSelectModel<typeof workExperiences>;

export default workExperiences;
