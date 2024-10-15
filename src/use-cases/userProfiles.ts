import { getUserProfile } from "@/data-access/userProfiles";

export const fetchUserProfileUseCase = async (userId: number) => {
  return await getUserProfile(userId);
};
