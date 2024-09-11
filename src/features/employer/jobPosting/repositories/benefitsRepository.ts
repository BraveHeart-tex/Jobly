import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import benefits, { type BenefitInsertModel } from "@/server/db/schema/benefits";

export const benefitsRepository = {
  async addBenefits(data: BenefitInsertModel[], transaction?: Transaction) {
    const dbLayer = transaction || db;
    return await dbLayer.insert(benefits).values(data).$returningId();
  },
};
