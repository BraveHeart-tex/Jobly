import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import { userProfiles, users } from "@/server/db/schema";
import type { ProfileData } from "@/validators/user/profile/profileValidator";
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

export const updateUserProfile = async (
  data: ProfileData & { userId: number },
  trx?: Transaction,
) => {
  const dbLayer = trx || db;
  const {
    id,
    userId,
    cityId,
    countryId,
    presentedWorkExperienceId,
    sector,
    title,
    websiteLink,
    websiteLinkText,
  } = data;
  return await dbLayer
    .insert(userProfiles)
    .values({
      id,
      cityId,
      countryId,
      presentedWorkExperienceId,
      sector,
      title,
      websiteLink,
      websiteLinkText,
      userId,
    })
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(userProfiles, ["id", "userId"]),
    });
};
