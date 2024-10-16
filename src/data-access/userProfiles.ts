import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getUserProfile = async (userId: number) => {
  const result = await db.query.users.findFirst({
    where: () => eq(users.id, userId),
    columns: {
      firstName: true,
      lastName: true,
    },
    with: {
      userProfile: true,
      workExperiences: true,
      educationalBackgrounds: true,
    },
  });

  if (!result) return null;

  return {
    ...result.userProfile,
    userId,
    firstName: result.firstName,
    lastName: result.lastName,
    workExperiences: result.workExperiences,
    educationalBackgrounds: result.educationalBackgrounds,
  };
};
