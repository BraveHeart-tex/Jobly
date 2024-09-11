import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import type { JobPostingBenefitInsertModel } from "@/server/db/schema/jobPostingBenefits";
import jobPostingBenefits from "@/server/db/schema/jobPostingBenefits";

export const jobPostingBenefitsRepository = {
  async addJobPostingBenefits(
    data: JobPostingBenefitInsertModel[],
    transaction?: Transaction,
  ) {
    const dbLayer = transaction || db;
    return await dbLayer.insert(jobPostingBenefits).values(data).$returningId();
  },
};
