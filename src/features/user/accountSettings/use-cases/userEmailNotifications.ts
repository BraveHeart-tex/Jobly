import {
  getUserEmailNotificationSettings,
  insertUserEmailNotificationSettings,
  updateUserEmailNotificationSettings,
} from "@/features/user/accountSettings/data-access/userEmailNotifications";
import { getChangedObjectFields } from "@/lib/utils/object";
import type { UpsertEmailSettingsData } from "@/schemas/user/settings/upsertEmailSettingsValidator";

export const upsertUserEmailNotificationSettingsUseCase = async (
  userId: number,
  newSettings: UpsertEmailSettingsData,
) => {
  const existingSettings = await getUserEmailNotificationSettings(userId);

  if (existingSettings) {
    const fieldsToUpdate = getChangedObjectFields(
      newSettings,
      existingSettings,
    );

    if (Object.keys(fieldsToUpdate).length > 0) {
      await updateUserEmailNotificationSettings({
        ...fieldsToUpdate,
        userId,
      });
    }
  } else {
    await insertUserEmailNotificationSettings({
      userId,
      jobAlerts: newSettings.jobAlerts || false,
      suitableJobPostings: newSettings.suitableJobPostings || false,
      followedJobPostingClosingDates:
        newSettings.followedJobPostingClosingDates || false,
    });
  }
};
