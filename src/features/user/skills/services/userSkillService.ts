import { userSkillRepository } from "../repositories/userSkillRepository";

export const userSkillService = {
  async createUserSkill({
    userId,
    skillId,
  }: { userId: number; skillId: number }) {
    return await userSkillRepository.createUserSkill({
      userId,
      skillId,
    });
  },
  async deleteUserSkill({
    userId,
    skillId,
  }: {
    userId: number;
    skillId: number;
  }) {
    return await userSkillRepository.deleteUserSkill({
      userId,
      skillId,
    });
  },
};
