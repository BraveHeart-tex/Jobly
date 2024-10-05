import type { DBUser } from "@/server/db/schema/users";
import { companyUserRepository } from "../repositories/companyUserRepository";

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
