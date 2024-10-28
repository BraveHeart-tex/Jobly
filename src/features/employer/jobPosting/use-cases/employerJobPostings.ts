import { db } from "@/server/db";
import type { JobPostingInsertModel } from "@/server/db/schema/jobPostings";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { TRPCError } from "@trpc/server";
import type { MakeFieldsRequired } from "@/lib/types";
import type { CreateJobPostingParams } from "@/features/employer/company/types";
import type { GetEmployerJobPostingsParams } from "@/features/employer/jobPosting/types";
import { insertJobPostingSkills } from "@/features/employer/jobPosting/utils";
import {
  createJobPosting,
  getActiveJobPostingsByCompanyId,
  getDraftJobPostingsByCompanyId,
  getExpiredJobPostingsByCompanyId,
  getJobPostingById,
  updateJobPosting,
} from "@/features/employer/jobPosting/data-access/employerJobPostings";
import {
  addJobPostingSkills,
  deleteJobPostingSkillById,
  getJobPostingSkillsByJobPostingId,
} from "@/features/employer/jobPosting/data-access/jobPostingSkills";

export const getJobPostingsUseCase = ({
  companyId,
  status,
}: GetEmployerJobPostingsParams) => {
  const statusToMethodMap = {
    draft: getDraftJobPostingsByCompanyId,
    published: getActiveJobPostingsByCompanyId,
    expired: getExpiredJobPostingsByCompanyId,
  };

  return statusToMethodMap[status](companyId);
};

export const createJobPostingUseCase = async (
  jobPostingData: CreateJobPostingParams,
) => {
  return await db.transaction(async (transaction) => {
    try {
      const { skills } = jobPostingData;
      const insertedJobPostingId = await createJobPosting(
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
        message: "An unexpected error occurred while creating the job posting.",
      });
    }
  });
};

export const getJobPostingByIdUseCase = async (jobPostingId: number) => {
  const jobPosting = await getJobPostingById(jobPostingId);

  if (!jobPosting) return null;

  return {
    ...jobPosting,
    skills: jobPosting.jobPostingSkills.map((item) => item.skill),
  };
};

export const updateJobPostingUseCase = async (
  data: MakeFieldsRequired<JobPostingInsertModel, "id"> & {
    skills: SkillSelectModel[];
  },
) => {
  const jobPostingSkills = await getJobPostingSkillsByJobPostingId(data.id);

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
      deleteJobPostingSkillById(skillsToRemove.map((item) => item.id)),
    );
  }

  if (skillsToAdd.length > 0) {
    operations.push(
      addJobPostingSkills(
        skillsToAdd.map((item) => ({
          jobPostingId: data.id,
          skillId: item.id,
        })),
      ),
    );
  }

  await Promise.all(operations);

  return updateJobPosting(data);
};
