import { api } from "@/trpc/react";

export const useSaveAboutSectionData = () => {
  const utils = api.useUtils();
  const { mutate: saveAboutInformation, isPending: isSavingAboutInformation } =
    api.userProfile.saveAboutInformation.useMutation({
      onSuccess: () => {
        utils.userProfile.getAboutInformation.invalidate();
      },
    });

  return { saveAboutInformation, isSavingAboutInformation };
};
