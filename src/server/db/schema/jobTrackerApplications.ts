import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
  datetime,
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";

const jobTrackerApplications = mysqlTable(
  "JobTrackerApplications",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    status: mysqlEnum("status", [
      "shortlist",
      "applied",
      "interview",
      "offer",
      "rejected",
    ]).notNull(),
    userId: int("userId")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    company: varchar("company", { length: 512 }).notNull(),
    jobTitle: varchar("jobTitle", { length: 512 }).notNull(),
    location: varchar("location", { length: 512 }).notNull(),
    url: text("url"),
    salary: decimal("salary", { precision: 10, scale: 2 }),
    notes: text("notes"),
    jobDescription: text("jobDescription"),
    displayOrder: int("displayOrder").notNull(),
    createdAt: datetime("createdAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull()
      .$onUpdate(() => sql`(now())`),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
    };
  },
);

export type JobTrackerApplication = InferSelectModel<
  typeof jobTrackerApplications
>;
export type JobTrackerApplicationInsertModel = InferInsertModel<
  typeof jobTrackerApplications
>;
export type JobTrackerApplicationStatus = JobTrackerApplication["status"];

export default jobTrackerApplications;
