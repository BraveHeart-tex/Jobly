import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "@/server/db/schema";

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
    createdAt: customTimestamp("createdAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull(),
    updatedAt: customTimestamp("updatedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull()
      .$onUpdate(() => getCurrentTimestamp()),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      status: index("status").on(table.status),
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
