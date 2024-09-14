import type { DBUser } from "@/server/db/schema/users";
import { userCompanyRepository } from "../repositories/userCompanyRepository";

export const userCompanyService = {
  async checkIfUserHasCompany(userId: DBUser["id"]) {
    return await userCompanyRepository.checkIfUserHasCompany(userId);
  },
  async getUserCompanyDetailsByUserId(userId: DBUser["id"]) {
    return await userCompanyRepository.getUserCompanyDetailsByUserId(userId);
  },
  async verifyUserCompanyAssociation({
    userId,
    companyId,
  }: { userId: DBUser["id"]; companyId: number }) {
    return await userCompanyRepository.verifyUserCompanyAssociation({
      userId,
      companyId,
    });
  },
};
