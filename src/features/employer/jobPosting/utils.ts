import { companyUserService } from "@/features/employer/company/services/userCompanyService";
import { jobPostingSkillsRepository } from "@/features/employer/jobPosting/repositories/jobPostingSkillsRepository";
import type { ContextUserAttributes } from "@/lib/auth/session";
import type { Transaction } from "@/lib/types";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { TRPCError } from "@trpc/server";

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

export const ensureEmployerCompanyLink = async (
  user: ContextUserAttributes,
) => {
  if (user.role !== "employer") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const company = await companyUserService.getCompanyUserDetailsByUserId(
    user.id,
  );

  if (!company) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const isAssociatedWithCompany =
    await companyUserService.verifyCompanyUserAssociation({
      userId: user.id,
      companyId: company.id,
    });

  if (!isAssociatedWithCompany) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You are not associated with this company.",
    });
  }

  return company.id;
};
