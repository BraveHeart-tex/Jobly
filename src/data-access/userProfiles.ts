import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import { cities, countries, userProfiles, users } from "@/server/db/schema";
import type { ProfileData } from "@/validators/user/profile/profileValidator";
import { eq } from "drizzle-orm";
import type { GetUserProfileReturn } from "./types";

export const getUserProfile = async (
  userId: number,
): Promise<GetUserProfileReturn | null> => {
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
  const { countryId, cityId } = result.userProfile;

  let selectedCountry = null;
  let selectedCity = null;

  if (countryId) {
    const countryResult = await db.query.countries.findFirst({
      where: () => eq(countries.id, countryId),
      with: {
        ...(cityId
          ? {
              cities: {
                where: () => eq(cities.id, cityId),
                limit: 1,
              },
            }
          : {}),
      },
    });

    selectedCountry = countryResult?.id
      ? {
          label: countryResult.name,
          value: countryResult.id,
        }
      : null;

    selectedCity =
      cityId && countryResult?.cities[0]
        ? {
            label: countryResult.cities[0].name,
            value: countryResult.cities[0].id,
          }
        : null;
  }

  return {
    ...result.userProfile,
    userId,
    firstName: result.firstName,
    lastName: result.lastName,
    workExperiences: result.workExperiences,
    educationalBackgrounds: result.educationalBackgrounds,
    selectedCountry,
    selectedCity,
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
