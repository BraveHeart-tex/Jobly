import {
  createUserPrivacySettings,
  getUserPrivacySettings,
  updateUserPrivacySettings,
} from "@/features/user/accountSettings/data-access/privacySettings";
import { getChangedObjectFields } from "@/lib/utils/object";
import type { PrivacySettingsData } from "@/validation/user/settings/privacySettingsValidator";

export const upsertPrivacySettingsUseCase = async (
  userId: number,
  data: PrivacySettingsData,
) => {
  const existingSettings = await getUserPrivacySettings(userId);

  if (existingSettings) {
    const fieldsToUpdate = getChangedObjectFields(data, existingSettings);

    await updateUserPrivacySettings(userId, fieldsToUpdate);
  } else {
    await createUserPrivacySettings({
      ...data,
      userId,
    });
  }
};
