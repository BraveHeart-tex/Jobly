import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { companies, companyUsers } from "@/server/db/schema";
import type { DBUser } from "@/server/db/schema/users";
import { and, count, eq, getTableColumns, sql } from "drizzle-orm";
import type { VerifyCompanyUserAssociationParams } from "../types";
import type { CompanyUserInsertModel } from "@/server/db/schema/companyUsers";

export const companyUserRepository = {
  async checkIfUserHasCompany(userId: DBUser["id"], transaction?: Transaction) {
    const dbLayer = transaction || db;
    const result = await dbLayer
      .select({
        value: count(companyUsers.id),
      })
      .from(companyUsers)
      .where(eq(companyUsers.userId, userId));

    if (!result[0]) return false;

    return result[0]?.value > 0;
  },
  async createCompanyUserRecord(
    data: CompanyUserInsertModel,
    transaction?: Transaction,
  ) {
    const dbLayer = transaction || db;
    const [result] = await dbLayer
      .insert(companyUsers)
      .values(data)
      .$returningId();

    return result?.id;
  },
  async getCompanyUserDetailsByUserId(userId: DBUser["id"]) {
    const [company] = await db
      .select({
        ...getTableColumns(companies),
      })
      .from(companies)
      .innerJoin(companyUsers, eq(companies.id, companyUsers.companyId))
      .where(eq(companyUsers.userId, userId));

    return company;
  },
  async verifyCompanyUserAssociation({
    userId,
    companyId,
  }: VerifyCompanyUserAssociationParams) {
    const exists = await db
      .select({
        exists: sql`1`,
      })
      .from(companies)
      .innerJoin(companyUsers, eq(companies.id, companyUsers.companyId))
      .where(and(eq(companyUsers.userId, userId), eq(companies.id, companyId)))
      .limit(1);

    return exists?.length > 0;
  },
};
