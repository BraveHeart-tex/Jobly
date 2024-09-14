import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import benefits, { type BenefitInsertModel } from "@/server/db/schema/benefits";
import { like } from "drizzle-orm";

export const benefitsRepository = {
  async addBenefits(data: BenefitInsertModel[], transaction?: Transaction) {
    const dbLayer = transaction || db;
    return await dbLayer.insert(benefits).values(data).$returningId();
  },
  async getBenefitsByName(query: string) {
    return await db
      .select()
      .from(benefits)
      .where(like(benefits.name, `%${query}%`))
      .limit(10);
  },
};
