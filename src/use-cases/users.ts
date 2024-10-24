import { updateUserAvatarUrl } from "@/data-access/users";
import { utapi } from "@/server/uploadThing";

const getFileKeyFromUrl = (url: string) => {
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
    await utapi.deleteFiles(getFileKeyFromUrl(previousAvatarUrl));
  }

  return isSuccess;
};
