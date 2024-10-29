import type {
  DeleteUserSkillParams,
  GetUserSkillBySkillIdParams,
  OrderedUserSkill,
} from "@/features/user/profile/types";
import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { skills, userHighlightedSkills } from "@/server/db/schema";
import userSkills, {
  type UserSkill,
  type InsertUserSkillModel,
} from "@/server/db/schema/userSkills";
import type { SaveUserSkillOrderData } from "@/validators/user/profile/saveUserSkillOrderValidator";
import type { UserSkillsData } from "@/validators/user/profile/userSkillsValidator";
import { and, desc, eq, inArray } from "drizzle-orm";

export const createUserSkill = async (
  data: InsertUserSkillModel,
  trx?: Transaction,
): Promise<number | undefined> => {
  const dbLayer = trx || db;

  const [result] = await dbLayer
    .insert(userSkills)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        skillId: data.skillId,
      },
    })
    .$returningId();

  return result?.id;
};

export const getUserSkillById = async (
  id: number,
): Promise<UserSkillsData | null> => {
  const result = await db.query.userSkills.findFirst({
    where: () => eq(userSkills.id, id),
    with: {
      skill: {
        columns: {
          id: true,
          name: true,
        },
      },
      userSkillEducationalBackgrounds: {
        columns: {
          educationalBackgroundId: true,
        },
      },
      userSkillWorkExperiences: {
        columns: {
          workExperienceId: true,
        },
      },
    },
  });

  if (!result) return null;

  return {
    attributedEducationIds: result.userSkillEducationalBackgrounds.map(
      (item) => item.educationalBackgroundId,
    ),
    attributedWorkExperienceIds: result.userSkillWorkExperiences.map(
      (item) => item.workExperienceId,
    ),
    selectedSkill: {
      id: result.skill.id,
      label: result.skill.name,
    },
  };
};

export const deleteUserSkill = ({
  userId,
  userSkillId,
}: DeleteUserSkillParams) => {
  return db
    .delete(userSkills)
    .where(and(eq(userSkills.userId, userId), eq(userSkills.id, userSkillId)));
};

export const getHighlightedUserSkillsByUserId = async (
  userId: number,
  trx?: Transaction,
) => {
  const dbLayer = trx || db;

  return await dbLayer
    .select()
    .from(userSkills)
    .leftJoin(
      userHighlightedSkills,
      eq(userSkills.id, userHighlightedSkills.userSkillId),
    )
    .where(eq(userSkills.userId, userId));
};

export const deleteHighlightedUserSkills = async (
  userSkillIds: number[],
  trx?: Transaction,
) => {
  const dbLayer = trx || db;
  return await dbLayer
    .delete(userSkills)
    .where(and(inArray(userSkills.id, userSkillIds)));
};

export const getUserSkillsByUserId = async (
  userId: number,
): Promise<OrderedUserSkill[]> => {
  return await db
    .select({
      id: userSkills.id,
      skillId: skills.id,
      name: skills.name,
      userId: userSkills.userId,
      displayOrder: userSkills.displayOrder,
    })
    .from(userSkills)
    .innerJoin(skills, eq(userSkills.skillId, skills.id))
    .where(eq(userSkills.userId, userId))
    .orderBy(desc(userSkills.displayOrder));
};

export const saveUserSkillOrder = async (
  userId: number,
  data: SaveUserSkillOrderData,
) => {
  await db.transaction(async (trx) => {
    const items = data.items.map((item) => ({
      id: item.id,
      skillId: item.skillId,
      userId,
      displayOrder: item.displayOrder,
    }));
    await Promise.all(
      items.map((item) =>
        trx
          .update(userSkills)
          .set({
            displayOrder: item.displayOrder,
          })
          .where(
            and(eq(userSkills.id, item.id), eq(userSkills.userId, userId)),
          ),
      ),
    );
  });
};

export const getUserSkillBySkillId = async ({
  userId,
  skillId,
  trx,
}: GetUserSkillBySkillIdParams): Promise<UserSkill | undefined> => {
  const [result] = await (trx || db)
    .select()
    .from(userSkills)
    .where(and(eq(userSkills.userId, userId), eq(userSkills.skillId, skillId)));

  return result;
};
