import { relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";

const jobPostingBenefits = mysqlTable(
  "JobPostingBenefits",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    jobPostingId: int("jobPostingId")
      .notNull()
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      }),
    benefitName: varchar("benefitName", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobPostingId),
      JobBenefit_id: primaryKey({
        columns: [table.id],
        name: "JobPostingBenefit_id",
      }),
    };
  },
);

export const jobPostingBenefitsRelations = relations(
  jobPostingBenefits,
  ({ one }) => ({
    jobPosting: one(jobPostings, {
      fields: [jobPostingBenefits.jobPostingId],
      references: [jobPostings.id],
    }),
  }),
);

export default jobPostingBenefits;
