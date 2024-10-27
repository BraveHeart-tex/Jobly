import {
  createEducationalBackground,
  deleteEducationalBackground,
  getEducationalBackground,
  getEducationalBackgrounds,
  updateEducationalBackground,
} from "@/features/user/profile/data-access/educationalBackgrounds";
import type { MakeFieldsRequired } from "@/lib/types";
import type {
  EducationalBackground,
  InsertEducationalBackgroundModel,
} from "@/server/db/schema/educationalBackgrounds";

export const createEducationalBackgroundUseCase = async (
  data: InsertEducationalBackgroundModel,
) => {
  return await createEducationalBackground(data);
};

export const deleteEducationalBackgroundUseCase = async (
  userId: number,
  educationalBackgroundId: number,
) => {
  return await deleteEducationalBackground(userId, educationalBackgroundId);
};

export const getEducationalBackgroundUseCase = async (
  userId: number,
  educationalBackgroundId: number,
) => {
  return await getEducationalBackground(userId, educationalBackgroundId);
};

export const updateEducationalBackgroundUseCase = async (
  data: MakeFieldsRequired<EducationalBackground, "id">,
) => {
  return await updateEducationalBackground(data);
};

export const getEducationalBackgroundsUseCase = async (userId: number) => {
  return await getEducationalBackgrounds(userId);
};
