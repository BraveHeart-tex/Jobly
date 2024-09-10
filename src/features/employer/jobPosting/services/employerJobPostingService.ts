import type { GetEmployerJobPostingsParams } from "../types";
import { employerJobPostingRepository } from "../repositories/employerJobPostingRepository";

export const employerJobPostingService = {
  async getJobPostings({ companyId, status }: GetEmployerJobPostingsParams) {
    const statusToMethodMap = {
      draft: employerJobPostingRepository.getDraftJobPostingsByCompanyId,
      published: employerJobPostingRepository.getActiveJobPostingsByCompanyId,
      expired: employerJobPostingRepository.getExpiredJobPostingsByCompanyId,
    };

    return statusToMethodMap[status](companyId);
  },
};
