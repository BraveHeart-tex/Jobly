import { companyUserRepository } from "@/features/employer/company/repositories/companyUserRepository";
import type { DBUser } from "@/server/db/schema/users";

export const companyUserService = {
  async checkIfUserHasCompany(userId: DBUser["id"]) {
    return await companyUserRepository.checkIfUserHasCompany(userId);
  },
  async getCompanyUserDetailsByUserId(userId: DBUser["id"]) {
    return await companyUserRepository.getCompanyUserDetailsByUserId(userId);
  },
  async verifyCompanyUserAssociation({
    userId,
    companyId,
  }: { userId: DBUser["id"]; companyId: number }) {
    return await companyUserRepository.verifyCompanyUserAssociation({
      userId,
      companyId,
    });
  },
};
