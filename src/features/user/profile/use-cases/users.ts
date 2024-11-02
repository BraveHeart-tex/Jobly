import {
  createUser,
  deleteCompanyUserAssociation,
  getUserAssociatedWithCompany,
  getUserByEmail,
  updatePersonalSettings,
  updateUserAvatarUrl,
} from "@/features/user/profile/data-access/users";
import { invalidateAllUserSessions } from "@/lib/auth/session";
import { db } from "@/server/db";
import type { DBUser, DBUserInsertModel } from "@/server/db/schema/users";
import { deleteFilesFromStorage } from "@/server/uploadThing";
import type { PersonalSettingsFormData } from "@/validators/user/settings/personalSettingsFormValidator";

export const updateUserAvatarUrlUseCase = async (
  userId: number,
  avatarUrl: string | null,
): Promise<boolean> => {
  const [result] = await updateUserAvatarUrl(userId, avatarUrl);

  return result.affectedRows > 0;
};

export const deleteUserAvatarUrlUseCase = async (
  userId: number,
  previousAvatarUrl: string,
) => {
  const [result] = await updateUserAvatarUrl(userId, null);
  const isSuccess = result.affectedRows > 0;

  if (isSuccess) {
    await deleteFilesFromStorage(previousAvatarUrl);
  }

  return isSuccess;
};

export const getUserByEmailUseCase = async (email: string) => {
  return await getUserByEmail(email);
};

export const createUserUseCase = async (data: DBUserInsertModel) => {
  return await createUser(data);
};

export const updatePersonalSettingsUseCase = async (
  data: PersonalSettingsFormData & {
    userId: number;
    previousRole?: DBUser["role"];
  },
) => {
  return await db.transaction(async (trx) => {
    const hasChangedRoles = data.accountType !== data.previousRole;

    if (hasChangedRoles) {
      const shouldDeleteUserCompanyAssociation =
        data.previousRole === "employer";

      await Promise.all([
        invalidateAllUserSessions(data.userId, trx),
        shouldDeleteUserCompanyAssociation
          ? deleteCompanyUserAssociation(data.userId, trx)
          : null,
      ]);
    }

    return await updatePersonalSettings(data, trx);
  });
};

export const getUserAssociatedWithCompanyUseCase = async (userId: number) => {
  const result = await getUserAssociatedWithCompany(userId);
  return result?.companyId;
};
