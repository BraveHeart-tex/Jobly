import { db } from "@/server/db";
import type { CompanySelectModel } from "@/server/db/schema/companies";
import { companyRepository } from "../repositories/companyRepository";
import { userCompanyRepository } from "../repositories/userCompanyRepository";
import type { CreateCompanyParams, CreateCompanyResult } from "../types";

export const companyService = {
  async createCompany(data: CreateCompanyParams): Promise<CreateCompanyResult> {
    return await db.transaction(async (transaction) => {
      const genericErrorMessage =
        "We encountered a problem while registering the company. Please try again later.";
      try {
        const hasAlreadyCreatedCompany =
          await userCompanyRepository.checkIfUserHasCompany(
            data.userId,
            transaction,
          );

        if (hasAlreadyCreatedCompany) {
          transaction.rollback();
          return {
            error: "You already have a company registered.",
            code: "BAD_REQUEST",
          };
        }

        const insertedCompanyId = await companyRepository.createCompany(
          data,
          transaction,
        );

        if (!insertedCompanyId) {
          transaction.rollback();
          return {
            error: genericErrorMessage,
            code: "INTERNAL_SERVER_ERROR",
          };
        }

        const userCompanyInsertId =
          await userCompanyRepository.createUserCompanyRecord(
            {
              companyId: insertedCompanyId,
              userId: data.userId,
            },
            transaction,
          );

        if (!userCompanyInsertId) {
          transaction.rollback();
          return {
            error: genericErrorMessage,
            code: "INTERNAL_SERVER_ERROR",
          };
        }

        return {
          companyId: insertedCompanyId,
        };
      } catch (error) {
        transaction.rollback();
        console.error("companyService.createCompany error", error);
        return {
          error: genericErrorMessage,
          code: "INTERNAL_SERVER_ERROR",
        };
      }
    });
  },
  async getCompanyDetailsById(companyId: CompanySelectModel["id"]) {
    return await companyRepository.getCompanyDetailsById(companyId);
  },
};
