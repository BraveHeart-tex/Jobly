import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { companies, userCompanies } from "@/server/db/schema";
import type { UserCompanyInsertModel } from "@/server/db/schema/userCompanies";
import type { DBUser } from "@/server/db/schema/users";
import { and, count, eq, getTableColumns, sql } from "drizzle-orm";
import type { VerifyUserCompanyAssociationParams } from "../types";

export const userCompanyRepository = {
  async checkIfUserHasCompany(userId: DBUser["id"], transaction?: Transaction) {
    const dbLayer = transaction || db;
    const result = await dbLayer
      .select({
        value: count(userCompanies.id),
      })
      .from(userCompanies)
      .where(eq(userCompanies.userId, userId));

    if (!result[0]) return false;

    return result[0]?.value > 0;
  },
  async createUserCompanyRecord(
    data: UserCompanyInsertModel,
    transaction?: Transaction,
  ) {
    const dbLayer = transaction || db;
    const [result] = await dbLayer
      .insert(userCompanies)
      .values(data)
      .$returningId();

    return result?.id;
  },
  async getUserCompanyDetailsByUserId(userId: DBUser["id"]) {
    const [company] = await db
      .select({
        ...getTableColumns(companies),
      })
      .from(companies)
      .innerJoin(userCompanies, eq(companies.id, userCompanies.companyId))
      .where(eq(userCompanies.userId, userId));

    return company;
  },
  async verifyUserCompanyAssociation({
    userId,
    companyId,
  }: VerifyUserCompanyAssociationParams) {
    const exists = await db
      .select({
        exists: sql`1`,
      })
      .from(companies)
      .innerJoin(userCompanies, eq(companies.id, userCompanies.companyId))
      .where(and(eq(userCompanies.userId, userId), eq(companies.id, companyId)))
      .limit(1);

    return exists?.length > 0;
  },
};
