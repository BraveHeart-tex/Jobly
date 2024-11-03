import {
  getCandidateNotificationSettings,
  insertCandidateNotificationSettings,
  updateCandidateNotificationSettings,
} from "@/features/user/accountSettings/data-access/candidateNotificationSettings";
import { getChangedObjectFields } from "@/lib/utils/object";
import type { CandidateNotificationSettingsData } from "@/validation/user/settings/candidateNotificationSettingsValidator";

export const upsertNotificationSettingsUseCase = async (
  userId: number,
  data: CandidateNotificationSettingsData,
) => {
  const existingSettings = await getCandidateNotificationSettings(userId);

  if (existingSettings) {
    const fieldsToUpdate = getChangedObjectFields(data, existingSettings);

    if (Object.keys(fieldsToUpdate).length > 0) {
      await updateCandidateNotificationSettings(userId, fieldsToUpdate);
    }
  } else {
    await insertCandidateNotificationSettings({
      userId,
      ...data,
    });
  }
};
