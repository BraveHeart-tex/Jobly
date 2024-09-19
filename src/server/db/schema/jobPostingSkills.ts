import { type InferInsertModel, relations } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";
import skills from "./skills";

const jobPostingSkills = mysqlTable(
  "JobPostingSkills",
  {
    id: int("id").autoincrement().notNull().primaryKey(),
    jobPostingId: int("jobPostingId")
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      })
      .notNull(),
    skillId: int("skillId")
      .references(() => skills.id)
      .notNull(),
  },
  (table) => {
    return {
      JobPostingSkill_id: primaryKey({
        columns: [table.id],
        name: "JobPostingSkill_id",
      }),
      jobPostingId: index("jobPostingId").on(table.jobPostingId),
      skillId: index("skillId").on(table.skillId),
    };
  },
);

export const jobPostingSkillsRelations = relations(
  jobPostingSkills,
  ({ one }) => ({
    jobPosting: one(jobPostings, {
      fields: [jobPostingSkills.jobPostingId],
      references: [jobPostings.id],
    }),
    skill: one(skills, {
      fields: [jobPostingSkills.skillId],
      references: [skills.id],
    }),
  }),
);

export type JobPostingSkillInsertModel = InferInsertModel<
  typeof jobPostingSkills
>;

export default jobPostingSkills;
