import { createUserSkillEducationalBackgrounds } from "@/features/user/profile/data-access/userSkillEducationalBackgrounds";
import { createUserSkillWorkExperiences } from "@/features/user/profile/data-access/userSkillWorkExperiences";
import {
  createUserSkill,
  deleteUserSkill,
  getUserSkillById,
  getUserSkillsByUserId,
  saveUserSkillOrder,
} from "@/features/user/profile/data-access/userSkills";
import type { DeleteUserSkillParams } from "@/features/user/profile/types";
import { db } from "@/server/db";
import type { SaveUserSkillOrderData } from "@/validators/user/profile/saveUserSkillOrderValidator";
import type { UserSkillsData } from "@/validators/user/profile/userSkillsValidator";

export const createUserSkillUseCase = async (
  userId: number,
  data: UserSkillsData,
) => {
  const {
    selectedSkill: { id: skillId },
    attributedWorkExperienceIds,
    attributedEducationIds,
  } = data;

  await db.transaction(async (trx) => {
    const userSkillId = await createUserSkill(
      {
        skillId,
        userId,
      },
      trx,
    );

    if (!userSkillId) {
      trx.rollback();
      return;
    }

    await Promise.all([
      attributedWorkExperienceIds.length
        ? createUserSkillWorkExperiences(
            attributedWorkExperienceIds.map((workExperienceId) => ({
              userSkillId,
              workExperienceId,
            })),
            trx,
          )
        : undefined,
      attributedEducationIds.length
        ? createUserSkillEducationalBackgrounds(
            attributedEducationIds.map((educationalBackgroundId) => ({
              userSkillId,
              educationalBackgroundId,
            })),
            trx,
          )
        : undefined,
    ]);
  });
};

export const getUserSkillByIdUseCase = async (id: number) => {
  return await getUserSkillById(id);
};

export const deleteUserSkillUseCase = async ({
  userId,
  userSkillId,
}: DeleteUserSkillParams) => {
  return await deleteUserSkill({ userId, userSkillId });
};

export const getUserSkillsByUserIdUseCase = async (userId: number) => {
  return await getUserSkillsByUserId(userId);
};

export const saveUserSkillOrderUseCase = async (
  userId: number,
  data: SaveUserSkillOrderData,
) => {
  return await saveUserSkillOrder(userId, data);
};
