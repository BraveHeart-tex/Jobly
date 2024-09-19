import { userCompanyService } from "@/features/employer/company/services/userCompanyService";
import type { CtxUserAttributes } from "@/lib/auth";
import type { Transaction } from "@/lib/types";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { TRPCError } from "@trpc/server";
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

export const ensureEmployerCompanyLink = async (user: CtxUserAttributes) => {
  if (user.role !== "employer") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const company = await userCompanyService.getUserCompanyDetailsByUserId(
    user.id,
  );

  if (!company) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const isAssociatedWithCompany =
    await userCompanyService.verifyUserCompanyAssociation({
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
