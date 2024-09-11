import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { JobPostingSkillInsertModel } from "@/server/db/schema/jobPostingSkills";
import jobPostingSkills from "@/server/db/schema/jobPostingSkills";

export const jobPostingSkillsRepository = {
  async addJobSkills(
    data: JobPostingSkillInsertModel[],
    transaction?: Transaction,
  ) {
    const dbLayer = transaction || db;
    return await dbLayer.insert(jobPostingSkills).values(data).$returningId();
  },
};
