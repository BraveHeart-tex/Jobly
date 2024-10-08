import type { WorkExperienceInsertModel } from "@/server/db/schema/workExperiences";
import { workExperienceRepository } from "../repository/workExperienceRepository";

export const workExperienceService = {
  createWorkExperience: async (data: WorkExperienceInsertModel) => {
    return workExperienceRepository.createWorkExperience(data);
  },
};
