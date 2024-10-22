import { userProfileRepository } from "@/features/user/profile/repositories/userProfileRepository";
import type { UserProfileInformation } from "@/features/user/profile/types";
import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";

export const userProfileService = {
  fetchUserProfileDetails: async (
    userId: number,
  ): Promise<UserProfileInformation | null> => {
    return userProfileRepository.fetchUserProfileDetails(userId);
  },
  getAboutInformation: (userId: number) => {
    return userProfileRepository.getAboutInformation(userId);
  },
  saveAboutInformation: (userId: number, input: SaveAboutInformationInput) => {
    return userProfileRepository.saveAboutInformation(userId, input);
  },
};
