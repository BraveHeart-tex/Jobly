import { relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
} from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";

const jobPostingContents = mysqlTable(
  "JobPostingContents",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    jobPostingId: int("jobPostingId")
      .notNull()
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      }),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobPostingId),
      JobPostingContent_id: primaryKey({
        columns: [table.id],
        name: "JobPostingContent_id",
      }),
    };
  },
);

export const jobPostingContentsRelations = relations(
  jobPostingContents,
  ({ one }) => ({
    jobPosting: one(jobPostings, {
      fields: [jobPostingContents.jobPostingId],
      references: [jobPostings.id],
    }),
  }),
);

export default jobPostingContents;
