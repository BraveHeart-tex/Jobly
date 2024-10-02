import type { UserProfileFormSchema } from "@/validators/user/profile/userProfileFormSchema";
import { db } from "@/server/db";
import {
  educationalBackgrounds,
  userHighlightedSkills,
  users,
  workExperiences,
} from "@/server/db/schema";
import { asc, desc, eq } from "drizzle-orm";

export const userProfileRepository = {
  async getUserProfileInformation(
    userId: number,
  ): Promise<UserProfileFormSchema | null> {
    const result = await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      where: () => eq(users.id, userId),
      with: {
        workExperiences: {
          orderBy: () => desc(workExperiences.startDate),
        },
        educationalBackgrounds: {
          orderBy: () => desc(educationalBackgrounds.startDate),
        },
        userSkills: {
          with: {
            skill: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      firstName: result.firstName,
      lastName: result.lastName,
      educationalBackground: result.educationalBackgrounds,
      skills: result.userSkills.map((item) => ({
        ...item.skill,
        level: item.level,
      })),
      workExperiences: result.workExperiences,
    };
  },
  async getAboutInformation(userId: number) {
    const result = await db.query.users.findFirst({
      columns: {
        id: true,
      },
      where: () => eq(users.id, userId),
      with: {
        userBio: {
          columns: {
            bio: true,
          },
        },
        userHighlightedSkills: {
          orderBy: () => asc(userHighlightedSkills.order),
          with: {
            skill: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      bio: result.userBio?.bio || "",
      highlightedSkills: result.userHighlightedSkills.map((item) => ({
        name: item.skill.name,
        userId: item.userId,
        skillId: item.skillId,
        order: item.order,
      })),
    };
  },
};
