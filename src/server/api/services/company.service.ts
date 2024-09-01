import { db } from "@/server/db";
import { companies, userCompanies } from "@/server/db/schema";
import { eq, getTableColumns, type InferInsertModel } from "drizzle-orm";

export const checkIfUserHasCompany = async (userId: number) => {
  const [result] = await db
    .select({ id: userCompanies.id })
    .from(userCompanies)
    .where(eq(userCompanies.userId, userId));
  return !!result;
};

interface RegisterNewCompanyParams extends InferInsertModel<typeof companies> {
  userId: number;
}

export const registerNewCompany = async (data: RegisterNewCompanyParams) => {
  if (!data || !data.userId) return;

  return await db.transaction(async (trx) => {
    try {
      const [hasAlreadyCreatedRegisteredCompany] = await trx
        .select({ id: userCompanies.id })
        .from(userCompanies)
        .where(eq(userCompanies.userId, data.userId));

      if (hasAlreadyCreatedRegisteredCompany) {
        return;
      }

      const [companyInsertResponse] = await trx
        .insert(companies)
        .values(data)
        .$returningId();
      const companyId = companyInsertResponse?.id;

      if (!companyId) {
        trx.rollback();
        return;
      }

      await trx.insert(userCompanies).values({
        companyId,
        userId: data.userId,
      });

      return companyId;
    } catch (error) {
      console.error("registerNewCompany error", error);
      trx.rollback();
    }
  });
};

export const getCompanyDetailsById = async (companyId: number) => {
  const [company] = await db
    .select()
    .from(companies)
    .where(eq(companies.id, companyId));
  return company;
};

export const getCompanyDetailsByEmployerId = async (employerId: number) => {
  const [company] = await db
    .select({
      ...getTableColumns(companies),
    })
    .from(companies)
    .innerJoin(userCompanies, eq(companies.id, userCompanies.companyId))
    .where(eq(userCompanies.userId, employerId));

  return company;
};
