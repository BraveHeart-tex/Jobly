import { db } from "@/server/db";
import type { CompanySelectModel } from "@/server/db/schema/companies";
import { TRPCError } from "@trpc/server";
import { companyRepository } from "../repositories/companyRepository";
import { companyUserRepository } from "../repositories/companyUserRepository";
import type { CreateCompanyParams } from "../types";

export const companyService = {
  async createCompany(data: CreateCompanyParams) {
    return await db.transaction(async (transaction) => {
      const genericErrorMessage =
        "We encountered a problem while registering the company. Please try again later.";
      try {
        const hasAlreadyCreatedCompany =
          await companyUserRepository.checkIfUserHasCompany(
            data.userId,
            transaction,
          );

        if (hasAlreadyCreatedCompany) {
          transaction.rollback();
          throw new TRPCError({
            message: "You already have a company registered.",
            code: "BAD_REQUEST",
          });
        }

        const insertedCompanyId = await companyRepository.createCompany(
          data,
          transaction,
        );

        if (!insertedCompanyId) {
          transaction.rollback();
          throw new TRPCError({
            message: genericErrorMessage,
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        const userCompanyInsertId =
          await companyUserRepository.createCompanyUserRecord(
            {
              companyId: insertedCompanyId,
              userId: data.userId,
            },
            transaction,
          );

        if (!userCompanyInsertId) {
          transaction.rollback();
          throw new TRPCError({
            message: genericErrorMessage,
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return {
          companyId: insertedCompanyId,
        };
      } catch (error) {
        transaction.rollback();
        console.error("companyService.createCompany error", error);
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: genericErrorMessage,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    });
  },
  async getCompanyDetailsById(companyId: CompanySelectModel["id"]) {
    return await companyRepository.getCompanyDetailsById(companyId);
  },
};
