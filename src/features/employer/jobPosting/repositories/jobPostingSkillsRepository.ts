import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { JobPostingSkillInsertModel } from "@/server/db/schema/jobPostingSkills";
import jobPostingSkills from "@/server/db/schema/jobPostingSkills";
import { eq, inArray } from "drizzle-orm";

export const jobPostingSkillsRepository = {
  async addJobSkills(
    data: JobPostingSkillInsertModel[],
    transaction?: Transaction,
  ) {
    const dbLayer = transaction || db;
    return await dbLayer.insert(jobPostingSkills).values(data).$returningId();
  },
  async getJobPostingSkillsByJobPostingId(jobPostingId: number) {
    return db
      .select()
      .from(jobPostingSkills)
      .where(eq(jobPostingSkills.jobPostingId, jobPostingId));
  },
  async deleteById(jobPostingSkillIds: number[]) {
    return db
      .delete(jobPostingSkills)
      .where(inArray(jobPostingSkills.id, jobPostingSkillIds));
  },
};
