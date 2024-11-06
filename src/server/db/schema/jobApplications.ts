import { users, jobPostings } from "@/server/db/schema";
import applicationDocuments from "@/server/db/schema/applicationDocuments";
import { customTimestamp } from "@/server/db/utils";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
} from "drizzle-orm/mysql-core";

const jobApplications = mysqlTable(
  "JobApplications",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    jobPostingId: int("jobPostingId")
      .notNull()
      .references(() => jobPostings.id),
    status: mysqlEnum("status", [
      "pending",
      "applied",
      "rejected",
      "interview",
      "offer",
    ] as const).default("applied"),
    appliedAt: customTimestamp("appliedAt"),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobPostingId),
      userId: index("userId").on(table.userId),
      status: index("status").on(table.status),
      Application_id: primaryKey({
        columns: [table.id],
        name: "JobApplication_id",
      }),
    };
  },
);

export const jobApplicationRelations = relations(
  jobApplications,
  ({ one, many }) => ({
    job: one(jobPostings, {
      fields: [jobApplications.jobPostingId],
      references: [jobPostings.id],
    }),
    user: one(users, {
      fields: [jobApplications.userId],
      references: [users.id],
    }),
    documents: many(applicationDocuments),
  }),
);

export type JobApplicationSelectModel = InferSelectModel<
  typeof jobApplications
>;
export type JobApplicationInsertModel = InferInsertModel<
  typeof jobApplications
>;

export default jobApplications;
