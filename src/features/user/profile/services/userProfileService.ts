import type { UserProfileFormSchema } from "@/schemas/user/profile/userProfileFormSchema";
import { db } from "@/server/db";
import {
  educationalBackgrounds,
  personalDetails,
  workExperiences,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userProfileService = {
  getUserProfileInformation: async (
    userId: number,
  ): Promise<UserProfileFormSchema> => {
    const dbPersonalDetails = await db.query.personalDetails.findFirst({
      where: () => eq(personalDetails.userId, userId),
    });
    const dbWorkExperiences = await db.query.workExperiences.findMany({
      where: () => eq(workExperiences.userId, userId),
    });
    const dbEducationalBackgrounds =
      await db.query.educationalBackgrounds.findMany({
        where: () => eq(educationalBackgrounds.userId, userId),
      });

    // TODO: Refactor db schema to handle null values
    return {
      ...dbPersonalDetails,
      workExperiences: dbWorkExperiences,
      educationalBackground: dbEducationalBackgrounds,
      skills: [],
    };
  },
};
