import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { employerJobPostingRepository } from "../repositories/employerJobPostingRepository";
import type { GetEmployerJobPostingsParams } from "../types";
import { getGenericTrpcError, insertBenefits, insertSkills } from "../utils";
import type { CreateJobPostingParams } from "../../company/types";

export const employerJobPostingService = {
  async getJobPostings({ companyId, status }: GetEmployerJobPostingsParams) {
    const statusToMethodMap = {
      draft: employerJobPostingRepository.getDraftJobPostingsByCompanyId,
      published: employerJobPostingRepository.getActiveJobPostingsByCompanyId,
      expired: employerJobPostingRepository.getExpiredJobPostingsByCompanyId,
    };

    return statusToMethodMap[status](companyId);
  },
  async createJobPosting(jobPostingData: CreateJobPostingParams) {
    return await db.transaction(async (transaction) => {
      try {
        const { createdBenefits, createdSkills } = jobPostingData;
        const insertedJobPostingId =
          await employerJobPostingRepository.createJobPosting(
            jobPostingData,
            transaction,
          );

        if (!insertedJobPostingId) {
          throw getGenericTrpcError();
        }

        await Promise.all([
          insertSkills(createdSkills, insertedJobPostingId, transaction),
          insertBenefits(createdBenefits, insertedJobPostingId, transaction),
        ]);

        return {
          jobPostingId: insertedJobPostingId,
        };
      } catch (error) {
        console.error(
          "employerJobPostingService.createJobPosting error",
          error,
        );
        transaction.rollback();

        if (error instanceof TRPCError) {
          throw error;
        }

        throw getGenericTrpcError();
      }
    });
  },
};
