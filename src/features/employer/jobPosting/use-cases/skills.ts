import {
  getSkillsByName,
  addSkills,
} from "@/features/employer/jobPosting/data-access/skills";

export const getSkillsByNameUseCase = async (query: string) => {
  return await getSkillsByName(query);
};

export const createSkillUseCase = async (skill: { name: string }) => {
  return await addSkills([skill]);
};
