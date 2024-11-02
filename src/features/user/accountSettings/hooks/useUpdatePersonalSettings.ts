import { api } from "@/trpc/react";
import type { PersonalSettingsFormData } from "@/validation/user/settings/personalSettingsFormValidator";

export const useUpdatePersonalSettings = (options?: {
  onSuccess?: (
    data: unknown,
    variables: PersonalSettingsFormData,
    context: unknown,
  ) => void;
}) => {
  const {
    mutate: updatePersonalSettings,
    isPending: isUpdatingPersonalSettings,
  } = api.user.updatePersonalSettings.useMutation(options);

  return {
    updatePersonalSettings,
    isUpdatingPersonalSettings,
  };
};
