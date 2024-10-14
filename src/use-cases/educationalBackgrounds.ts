import {
  createEducationalBackground,
  deleteEducationalBackground,
} from "@/data-access/educationalBackgrounds";
import type { InsertEducationalBackgroundModel } from "@/server/db/schema/educationalBackgrounds";

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
