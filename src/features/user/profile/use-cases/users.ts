import {
  createUser,
  getUserByEmail,
  updatePersonalSettings,
  updateUserAvatarUrl,
} from "@/features/user/profile/data-access/users";
import { invalidateAllUserSessions } from "@/lib/auth/session";
import { db } from "@/server/db";
import { companyUsers } from "@/server/db/schema";
import type { DBUserInsertModel } from "@/server/db/schema/users";
import { utapi } from "@/server/uploadThing";
import type { PersonalSettingsFormData } from "@/validators/user/profile/settings/personalSettingsFormValidator";
import { eq } from "drizzle-orm";

export const getUploadThingFileKeyFromUrl = (url: string) => {
  return url.split("/").pop() || "";
};

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
    await utapi.deleteFiles(getUploadThingFileKeyFromUrl(previousAvatarUrl));
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
  data: PersonalSettingsFormData & { userId: number; hasChangedRoles: boolean },
) => {
  if (data.hasChangedRoles) {
    await invalidateAllUserSessions(data.userId);
  }

  return await updatePersonalSettings(data);
};

export const getCompanyUserCompanyId = async (userId: number) => {
  const [result] = await db
    .select({
      companyId: companyUsers.companyId,
    })
    .from(companyUsers)
    .where(eq(companyUsers.userId, userId));
  return result?.companyId;
};
