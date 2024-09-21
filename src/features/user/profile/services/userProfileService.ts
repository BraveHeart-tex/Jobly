import type { UserProfileFormSchema } from "@/schemas/user/profile/userProfileFormSchema";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userProfileService = {
  getUserProfileInformation: async (
    userId: number,
  ): Promise<UserProfileFormSchema | null> => {
    const result = await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      where: () => eq(users.id, userId),
      with: {
        workExperiences: true,
        educationalBackgrounds: true,
        personalDetail: true,
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
      ...result.personalDetail,
      educationalBackground: result.educationalBackgrounds,
      skills: result.userSkills.map((item) => ({
        ...item.skill,
        level: item.level,
      })),
      workExperiences: result.workExperiences,
    };
  },
};
