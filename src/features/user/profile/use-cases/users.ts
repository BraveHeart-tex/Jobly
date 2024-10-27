import {
  createUser,
  deleteUserById,
  getUserByEmail,
  updateUserAvatarUrl,
} from "@/features/user/profile/data-access/users";
import type { DBUserInsertModel, DBUser } from "@/server/db/schema/users";
import { utapi } from "@/server/uploadThing";

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

export const deleteUserByIdUseCase = async (id: DBUser["id"]) => {
  return await deleteUserById(id);
};
