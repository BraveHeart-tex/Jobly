import type { Transaction } from "@/lib/types";
import { TRPCError } from "@trpc/server";
import { benefitsRepository } from "./repositories/benefitsRepository";
import { jobPostingBenefitsRepository } from "./repositories/jobPostingBenefitsRepository";
import { jobPostingSkillsRepository } from "./repositories/jobPostingSkillsRepository";
import { skillsRepository } from "./repositories/skillsRepository";

export const getGenericTrpcError = () => {
  return new TRPCError({
    message:
      "We encountered a problem while creating your job posting. Please try again later.",
    code: "INTERNAL_SERVER_ERROR",
  });
};

export const doesBulkInsertHaveFailures = (
  inputArray: unknown[],
  resultArray: unknown[],
) => {
  return inputArray.length !== resultArray.length;
};

export const handleSkills = async (
  skills: string[],
  jobPostingId: number,
  transaction: Transaction,
) => {
  if (!skills.length) return [];
  const skillInsertIds = await skillsRepository.addSkills(
    skills.map((skill) => ({
      name: skill,
    })),
    transaction,
  );

  if (doesBulkInsertHaveFailures(skills, skillInsertIds)) {
    throw getGenericTrpcError();
  }

  // insert to job posting skills
  const jobPostingSkillInsertIds =
    await jobPostingSkillsRepository.addJobSkills(
      skills.map((_, index) => ({
        jobPostingId,
        skillId: skillInsertIds[index]?.id as number,
      })),
      transaction,
    );

  if (doesBulkInsertHaveFailures(skills, jobPostingSkillInsertIds)) {
    throw getGenericTrpcError();
  }
};

export const handleBenefits = async (
  benefits: string[],
  jobPostingId: number,
  transaction: Transaction,
) => {
  if (!benefits.length) return [];

  const benefitInsertIds = await benefitsRepository.addBenefits(
    benefits.map((benefit) => ({ name: benefit })),
    transaction,
  );
  if (doesBulkInsertHaveFailures(benefits, benefitInsertIds)) {
    throw getGenericTrpcError();
  }

  const jobPostingBenefitInsertIds =
    await jobPostingBenefitsRepository.addJobPostingBenefits(
      benefits.map((_, index) => ({
        jobPostingId,
        benefitId: benefitInsertIds[index]?.id as number,
      })),
      transaction,
    );
  if (doesBulkInsertHaveFailures(benefits, jobPostingBenefitInsertIds)) {
    throw getGenericTrpcError();
  }
};
