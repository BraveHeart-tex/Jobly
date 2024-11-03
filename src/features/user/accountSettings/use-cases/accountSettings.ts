import { getCandidateAccountSettings } from "@/features/user/accountSettings/data-access/accountSettings";

export const getCandidateAccountSettingsUseCase = async (
  userId: number,
  currentSessionId: string,
) => {
  return await getCandidateAccountSettings(userId, currentSessionId);
};
