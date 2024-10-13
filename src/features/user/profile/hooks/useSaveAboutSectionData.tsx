import { api } from "@/trpc/react";

export const useSaveAboutSectionData = (
  options: {
    onSuccess?: () => void;
  } = {},
) => {
  const { mutate: saveAboutInformation, isPending: isSavingAboutInformation } =
    api.userProfile.saveAboutInformation.useMutation(options);

  return { saveAboutInformation, isSavingAboutInformation };
};
