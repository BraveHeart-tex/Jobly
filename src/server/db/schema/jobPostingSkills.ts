import type { InferInsertModel } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";
import skills from "./skills";

const jobPostingSkills = mysqlTable(
  "JobPostingSkills",
  {
    jobPostingId: int("jobPostingId")
      .references(() => jobPostings.id)
      .notNull(),
    skillId: int("skillId")
      .references(() => skills.id)
      .notNull(),
  },
  (table) => {
    return {
      JobPostingSkill_id: primaryKey({
        columns: [table.jobPostingId, table.skillId],
        name: "JobPostingSkill_id",
      }),
      jobPostingId: index("jobPostingId").on(table.jobPostingId),
      skillId: index("skillId").on(table.skillId),
    };
  },
);

export type JobPostingSkillInsertModel = InferInsertModel<
  typeof jobPostingSkills
>;

export default jobPostingSkills;
