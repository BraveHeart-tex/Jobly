import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { JobPostingSkillInsertModel } from "@/server/db/schema/jobPostingSkills";
import jobPostingSkills from "@/server/db/schema/jobPostingSkills";
import { eq, inArray } from "drizzle-orm";

export const addJobPostingSkills = async (
  data: JobPostingSkillInsertModel[],
  transaction?: Transaction,
) => {
  const dbLayer = transaction || db;
  return await dbLayer.insert(jobPostingSkills).values(data).$returningId();
};

export const getJobPostingSkillsByJobPostingId = async (
  jobPostingId: number,
) => {
  return db
    .select()
    .from(jobPostingSkills)
    .where(eq(jobPostingSkills.jobPostingId, jobPostingId));
};

export const deleteJobPostingSkillById = async (
  jobPostingSkillIds: number[],
) => {
  return db
    .delete(jobPostingSkills)
    .where(inArray(jobPostingSkills.id, jobPostingSkillIds));
};
