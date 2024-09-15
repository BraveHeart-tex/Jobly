import type { Transaction } from "@/lib/types";
import { TRPCError } from "@trpc/server";
import { jobPostingBenefitsRepository } from "./repositories/jobPostingBenefitsRepository";
import { jobPostingSkillsRepository } from "./repositories/jobPostingSkillsRepository";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import type { BenefitSelectModel } from "@/server/db/schema/benefits";

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

export const insertJobPostingSkills = async (
  skills: SkillSelectModel[],
  jobPostingId: number,
  transaction: Transaction,
) => {
  if (!skills.length) return [];

  await jobPostingSkillsRepository.addJobSkills(
    skills.map((skill) => ({
      jobPostingId,
      skillId: skill.id,
    })),
    transaction,
  );
};

export const insertJobPostingBenefits = async (
  benefits: BenefitSelectModel[],
  jobPostingId: number,
  transaction: Transaction,
) => {
  if (!benefits.length) return [];

  await jobPostingBenefitsRepository.addJobPostingBenefits(
    benefits.map((benefit) => ({
      jobPostingId,
      benefitId: benefit.id,
    })),
    transaction,
  );
};
