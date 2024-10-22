import { updateUserAvatarUrl } from "@/data-access/users";

export const updateUserAvatarUrlUseCase = async (
  userId: number,
  avatarUrl: string,
): Promise<boolean> => {
  const [result] = await updateUserAvatarUrl(userId, avatarUrl);

  return result.affectedRows > 0;
};
