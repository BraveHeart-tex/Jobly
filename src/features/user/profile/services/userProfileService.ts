import type { UserProfileFormSchema } from "@/validators/user/profile/userProfileFormSchema";
import { userProfileRepository } from "../repositories/userProfileRepository";

export const userProfileService = {
  getUserProfileInformation: async (
    userId: number,
  ): Promise<UserProfileFormSchema | null> => {
    return userProfileRepository.getUserProfileInformation(userId);
  },
  getAboutInformation: (userId: number) => {
    return userProfileRepository.getAboutInformation(userId);
  },
};
