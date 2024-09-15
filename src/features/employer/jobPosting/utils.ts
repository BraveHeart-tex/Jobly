import type { Transaction } from "@/lib/types";
import type { BenefitSelectModel } from "@/server/db/schema/benefits";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { jobPostingBenefitsRepository } from "./repositories/jobPostingBenefitsRepository";
import { jobPostingSkillsRepository } from "./repositories/jobPostingSkillsRepository";

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
