import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { companies } from "@/server/db/schema";
import type {
  CompanyInsertModel,
  CompanySelectModel,
} from "@/server/db/schema/companies";
import { eq } from "drizzle-orm";

export const companyRepository = {
  async createCompany(data: CompanyInsertModel, transaction?: Transaction) {
    const dbLayer = transaction || db;
    const [result] = await dbLayer
      .insert(companies)
      .values(data)
      .$returningId();

    return result?.id;
  },
  async getCompanyDetailsById(companyId: CompanySelectModel["id"]) {
    return await db.query.companies.findFirst({
      where: () => eq(companies.id, companyId),
    });
  },
};
