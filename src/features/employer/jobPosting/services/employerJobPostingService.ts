import type { JobPostingSchema } from "@/schemas/jobPostingSchema";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { employerJobPostingRepository } from "../repositories/employerJobPostingRepository";
import type { GetEmployerJobPostingsParams } from "../types";
import { getGenericTrpcError, handleBenefits, handleSkills } from "../utils";

export const employerJobPostingService = {
  async getJobPostings({ companyId, status }: GetEmployerJobPostingsParams) {
    const statusToMethodMap = {
      draft: employerJobPostingRepository.getDraftJobPostingsByCompanyId,
      published: employerJobPostingRepository.getActiveJobPostingsByCompanyId,
      expired: employerJobPostingRepository.getExpiredJobPostingsByCompanyId,
    };

    return statusToMethodMap[status](companyId);
  },
  async createJobPosting(jobPostingData: JobPostingSchema) {
    return await db.transaction(async (transaction) => {
      try {
        const insertedJobPostingId =
          await employerJobPostingRepository.createJobPosting(
            jobPostingData,
            transaction,
          );

        if (!insertedJobPostingId) {
          throw getGenericTrpcError();
        }

        await Promise.all([
          handleSkills(
            jobPostingData.skills,
            insertedJobPostingId,
            transaction,
          ),
          handleBenefits(
            jobPostingData.benefits,
            insertedJobPostingId,
            transaction,
          ),
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
