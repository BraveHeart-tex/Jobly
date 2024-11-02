import {
  createUserSkillEducationalBackgrounds,
  deleteUserSkillEducationalBackgrounds,
} from "@/features/user/profile/data-access/userSkillEducationalBackgrounds";
import {
  createUserSkillWorkExperiences,
  deleteUserSkillWorkExperiences,
} from "@/features/user/profile/data-access/userSkillWorkExperiences";
import {
  createUserSkill,
  deleteUserSkill,
  deleteUserSkillBySkillId,
  getUserSkillById,
  getUserSkillBySkillId,
  getUserSkillsByUserId,
  saveUserSkillOrder,
} from "@/features/user/profile/data-access/userSkills";
import type {
  DeleteUserSkillParams,
  GetUserSkillBySkillIdParams,
} from "@/features/user/profile/types";
import { db } from "@/server/db";
import type { SaveUserSkillOrderData } from "@/validation/user/profile/saveUserSkillOrderValidator";
import type { UserSkillsData } from "@/validation/user/profile/userSkillsValidator";

export const createUserSkillUseCase = async (
  userId: number,
  data: UserSkillsData,
) => {
  const {
    selectedSkill: { id: skillId },
    attributedWorkExperienceIds,
    attributedEducationIds,
    previousSkillId,
  } = data;

  await db.transaction(async (trx) => {
    if (previousSkillId) {
      await deleteUserSkillBySkillId(previousSkillId, trx);
    }

    let userSkillId = await createUserSkill(
      {
        skillId,
        userId,
      },
      trx,
    );

    if (!userSkillId) {
      const duplicateUserSkill = await getUserSkillBySkillIdUse({
        userId,
        skillId,
        trx,
      });

      if (!duplicateUserSkill) {
        trx.rollback();
        return;
      }

      userSkillId = duplicateUserSkill.id;
    }

    await Promise.all([
      deleteUserSkillWorkExperiences(userSkillId, trx),
      deleteUserSkillEducationalBackgrounds(userSkillId, trx),
    ]);

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

export const getUserSkillBySkillIdUse = async ({
  userId,
  skillId,
  trx,
}: GetUserSkillBySkillIdParams) => {
  return await getUserSkillBySkillId({ userId, skillId, trx });
};
