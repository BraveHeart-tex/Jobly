import { skillsRepository } from "../repositories/skillsRepository";

export const skillsService = {
  async getSkillsByName(query: string) {
    return await skillsRepository.getSkillsByName(query);
  },
  async createSkill(skill: { name: string }) {
    return await skillsRepository.addSkills([skill]);
  },
};
