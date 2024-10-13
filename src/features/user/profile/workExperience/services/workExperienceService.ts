import type {
  WorkExperience,
  WorkExperienceInsertModel,
} from "@/server/db/schema/workExperiences";
import { workExperienceRepository } from "../repository/workExperienceRepository";
import type { GetWorkExperienceParams } from "../types";
import type { MakeFieldsRequired } from "@/lib/types";

export const workExperienceService = {
  async createWorkExperience(data: WorkExperienceInsertModel) {
    return workExperienceRepository.createWorkExperience(data);
  },
  async getWorkExperience({ userId, experienceId }: GetWorkExperienceParams) {
    return workExperienceRepository.getWorkExperience({ userId, experienceId });
  },
  async updateWorkExperience(data: MakeFieldsRequired<WorkExperience, "id">) {
    return workExperienceRepository.updateWorkExperience(data);
  },
};
