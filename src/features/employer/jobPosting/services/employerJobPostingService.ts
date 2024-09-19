import { jobPostingSkillsRepository } from "@/features/employer/jobPosting/repositories/jobPostingSkillsRepository";
import { db } from "@/server/db";
import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { TRPCError } from "@trpc/server";
import type { CreateJobPostingParams } from "../../company/types";
import { employerJobPostingRepository } from "../repositories/employerJobPostingRepository";
import type { GetEmployerJobPostingsParams } from "../types";
import { insertJobPostingSkills } from "../utils";

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
        const { skills } = jobPostingData;
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

        await insertJobPostingSkills(skills, insertedJobPostingId, transaction);

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
    const jobPosting =
      await employerJobPostingRepository.getJobPostingById(jobPostingId);

    if (!jobPosting) return null;

    return {
      ...jobPosting,
      skills: jobPosting.jobPostingSkills.map((item) => item.skill),
    };
  },
  async updateJobPosting(
    data: JobPostingSelectModel & { skills: SkillSelectModel[] },
  ) {
    const jobPostingSkills =
      await jobPostingSkillsRepository.getJobPostingSkillsByJobPostingId(
        data.id,
      );

    const existingSkillIds = jobPostingSkills.map((skill) => skill.id);
    const updatedSkillIds = data.skills.map((skill) => skill.id);

    const skillsToRemove = jobPostingSkills.filter(
      (skill) => !updatedSkillIds.includes(skill.id),
    );

    const skillsToAdd = data.skills.filter(
      (skill) => !existingSkillIds.includes(skill.id),
    );

    const operations = [];

    if (skillsToRemove.length > 0) {
      operations.push(
        jobPostingSkillsRepository.deleteById(
          skillsToRemove.map((item) => item.id),
        ),
      );
    }

    if (skillsToAdd.length > 0) {
      operations.push(
        jobPostingSkillsRepository.addJobSkills(
          skillsToAdd.map((item) => ({
            jobPostingId: data.id,
            skillId: item.id,
          })),
        ),
      );
    }

    await Promise.all(operations);

    return employerJobPostingRepository.updateJobPosting(data);
  },
};
