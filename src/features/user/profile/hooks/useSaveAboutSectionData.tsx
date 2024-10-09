import type { ReactQueryOptions } from "@/lib/types";
import { api } from "@/trpc/react";

export const useSaveAboutSectionData = (
  options: ReactQueryOptions["userProfile"]["saveAboutInformation"] = {},
) => {
  const { mutate: saveAboutInformation, isPending: isSavingAboutInformation } =
    api.userProfile.saveAboutInformation.useMutation(options);

  return { saveAboutInformation, isSavingAboutInformation };
};
