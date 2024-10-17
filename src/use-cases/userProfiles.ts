import { getUserProfile, updateUserProfile } from "@/data-access/userProfiles";
import { updateUserNameAndLastName } from "@/data-access/users";
import { db } from "@/server/db";
import type { ProfileData } from "@/validators/user/profile/profileValidator";

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
