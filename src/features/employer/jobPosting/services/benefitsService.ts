import { benefitsRepository } from "../repositories/benefitsRepository";

export const benefitsService = {
  async getBenefitsByName(query: string) {
    return await benefitsRepository.getBenefitsByName(query);
  },
};
