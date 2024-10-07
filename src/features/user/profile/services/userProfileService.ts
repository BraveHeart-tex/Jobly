import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";
import { userProfileRepository } from "../repositories/userProfileRepository";
import type { UserProfileInformation } from "../types";

export const userProfileService = {
  getUserProfileInformation: async (
    userId: number,
  ): Promise<UserProfileInformation | null> => {
    return userProfileRepository.getUserProfileInformation(userId);
  },
  getAboutInformation: (userId: number) => {
    return userProfileRepository.getAboutInformation(userId);
  },
  saveAboutInformation: (userId: number, input: SaveAboutInformationInput) => {
    return userProfileRepository.saveAboutInformation(userId, input);
  },
};
