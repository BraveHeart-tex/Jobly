import {
  getUserProfile,
  updateUserProfile,
} from "@/features/user/profile/data-access/userProfiles";
import { updateUserNameAndLastName } from "@/features/user/profile/data-access/users";
import { db } from "@/server/db";
import type { ProfileData } from "@/validators/user/profile/profileValidator";
import { userProfileRepository } from "@/features/user/profile/data-access/userProfileRepository";
import type { UserProfileInformation } from "@/features/user/profile/types";
import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";

export const fetchUserProfileUseCase = async (userId: number) => {
  return await getUserProfile(userId);
};

export const updateUserProfileUseCase = async (
  data: ProfileData & { userId: number },
): Promise<void> => {
  return db.transaction(async (trx) => {
    await Promise.all([
      updateUserNameAndLastName(
        {
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        trx,
      ),
      updateUserProfile(data, trx),
    ]);
  });
};

export const fetchUserProfileDetailsUseCase = async (
  userId: number,
): Promise<UserProfileInformation | null> => {
  return userProfileRepository.fetchUserProfileDetails(userId);
};

export const getAboutInformationUseCase = async (userId: number) => {
  return userProfileRepository.getAboutInformation(userId);
};

export const saveAboutInformationUseCase = async (
  userId: number,
  input: SaveAboutInformationInput,
) => {
  return userProfileRepository.saveAboutInformation(userId, input);
};
