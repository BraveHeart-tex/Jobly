import { type InferInsertModel, relations } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import benefits from "./benefits";
import jobPostings from "./jobPostings";

const jobPostingBenefits = mysqlTable(
  "JobPostingBenefits",
  {
    id: int("id").autoincrement().notNull().primaryKey(),
    jobPostingId: int("jobPostingId")
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      })
      .notNull(),
    benefitId: int("benefitId")
      .references(() => benefits.id)
      .notNull(),
  },
  (table) => {
    return {
      JobPostingBenefit_id: primaryKey({
        columns: [table.id],
        name: "JobPostingBenefit_id",
      }),
      jobPostingId: index("jobPostingId").on(table.jobPostingId),
      benefitId: index("benefitId").on(table.benefitId),
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
    benefit: one(benefits, {
      fields: [jobPostingBenefits.benefitId],
      references: [benefits.id],
    }),
  }),
);

export type JobPostingBenefitInsertModel = InferInsertModel<
  typeof jobPostingBenefits
>;

export default jobPostingBenefits;
