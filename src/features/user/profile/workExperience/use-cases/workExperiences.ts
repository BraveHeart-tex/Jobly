import type {
  WorkExperience,
  InsertWorkExperienceModel,
} from "@/server/db/schema/workExperiences";
import type { MakeFieldsRequired } from "@/lib/types";
import type {
  GetWorkExperienceParams,
  DeleteWorkExperienceParams,
} from "@/features/user/profile/workExperience/types";
import {
  createWorkExperience,
  getWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "@/features/user/profile/workExperience/data-access/workExperiences";

export const createWorkExperienceUseCase = async (
  data: InsertWorkExperienceModel,
) => {
  return createWorkExperience(data);
};

export const getWorkExperienceUseCase = async ({
  userId,
  experienceId,
}: GetWorkExperienceParams) => {
  return getWorkExperience({ userId, experienceId });
};

export const updateWorkExperienceUseCase = async (
  data: MakeFieldsRequired<WorkExperience, "id">,
) => {
  return updateWorkExperience(data);
};

export const deleteWorkExperienceUseCase = async ({
  userId,
  experienceId,
}: DeleteWorkExperienceParams) => {
  return deleteWorkExperience({
    userId,
    experienceId,
  });
};
