import type {
  WorkExperience,
  InsertWorkExperienceModel,
} from "@/server/db/schema/workExperiences";
import { workExperienceRepository } from "../repository/workExperienceRepository";
import type {
  DeleteWorkExperienceParams,
  GetWorkExperienceParams,
} from "../types";
import type { MakeFieldsRequired } from "@/lib/types";

export const workExperienceService = {
  async createWorkExperience(data: InsertWorkExperienceModel) {
    return workExperienceRepository.createWorkExperience(data);
  },
  async getWorkExperience({ userId, experienceId }: GetWorkExperienceParams) {
    return workExperienceRepository.getWorkExperience({ userId, experienceId });
  },
  async updateWorkExperience(data: MakeFieldsRequired<WorkExperience, "id">) {
    return workExperienceRepository.updateWorkExperience(data);
  },
  async deleteWorkExperience({
    userId,
    experienceId,
  }: DeleteWorkExperienceParams) {
    return workExperienceRepository.deleteWorkExperience({
      userId,
      experienceId,
    });
  },
};
