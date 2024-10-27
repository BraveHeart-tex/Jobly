import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import userSkills, {
  type InsertUserSkillModel,
} from "@/server/db/schema/userSkills";
import type { UserSkillsData } from "@/validators/user/profile/userSkillsValidator";
import { eq } from "drizzle-orm";

export const createUserSkill = async (
  data: InsertUserSkillModel,
  trx?: Transaction,
): Promise<number | undefined> => {
  const dbLayer = trx || db;

  const [result] = await dbLayer.insert(userSkills).values(data).$returningId();

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
