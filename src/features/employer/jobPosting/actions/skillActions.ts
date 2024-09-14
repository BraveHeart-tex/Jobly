"use server";

import { skillsService } from "../services/skillsService";

export const getSkillsByName = async (query: string) => {
  return await skillsService.getSkillsByName(query);
};
