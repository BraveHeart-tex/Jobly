import { db } from "@/server/db";
import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";
import { TRPCError } from "@trpc/server";
import type { CreateJobPostingParams } from "../../company/types";
import { employerJobPostingRepository } from "../repositories/employerJobPostingRepository";
import type { GetEmployerJobPostingsParams } from "../types";
import { insertJobPostingBenefits, insertJobPostingSkills } from "../utils";

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
        const { benefits, skills } = jobPostingData;
        const insertedJobPostingId =
          await employerJobPostingRepository.createJobPosting(
            jobPostingData,
            transaction,
          );

        if (!insertedJobPostingId) {
          throw new Error(
            "Something went wrong while creating the job posting. Please try again later.",
          );
        }

        await Promise.all([
          insertJobPostingSkills(skills, insertedJobPostingId, transaction),
          insertJobPostingBenefits(benefits, insertedJobPostingId, transaction),
        ]);

        return {
          jobPostingId: insertedJobPostingId,
        };
      } catch (error) {
        console.error(
          "Error in employerJobPostingService.createJobPosting:",
          error,
        );

        try {
          await transaction.rollback();
          console.info("Transaction rolled back successfully.");
        } catch (rollbackError) {
          console.error("Transaction rollback failed:", rollbackError);
        }

        if (
          error instanceof Error &&
          error.message ===
            "Something went wrong while creating the job posting. Please try again later."
        ) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Something went wrong while creating the job posting. Please try again later.",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An unexpected error occurred while creating the job posting.",
        });
      }
    });
  },
  async getJobPostingById(jobPostingId: number) {
    return employerJobPostingRepository.getJobPostingById(jobPostingId);
  },
  async updateJobPosting(data: JobPostingSelectModel) {
    return employerJobPostingRepository.updateJobPosting(data);
  },
};
