import { relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";

const jobPostingSkills = mysqlTable(
  "JobPostingSkills",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    jobPostingId: int("jobPostingId")
      .notNull()
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      }),
    skillName: varchar("skillName", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobPostingId),
      JobSkill_id: primaryKey({
        columns: [table.id],
        name: "JobPostingSkill_id",
      }),
    };
  },
);

export const jobPostingSkillRelations = relations(
  jobPostingSkills,
  ({ one }) => ({
    job: one(jobPostings, {
      fields: [jobPostingSkills.jobPostingId],
      references: [jobPostings.id],
    }),
  }),
);

export default jobPostingSkills;
