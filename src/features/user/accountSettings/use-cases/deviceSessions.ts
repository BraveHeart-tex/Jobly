import { deleteDeviceSession } from "@/features/user/accountSettings/data-access/deviceSessions";

export const deleteDeviceSessionUseCase = async (
  userId: number,
  sessionId: string,
) => {
  return await deleteDeviceSession(userId, sessionId);
};
