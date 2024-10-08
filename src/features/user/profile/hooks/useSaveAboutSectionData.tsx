import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const useSaveAboutSectionData = () => {
  const router = useRouter();
  const { mutate: saveAboutInformation, isPending: isSavingAboutInformation } =
    api.userProfile.saveAboutInformation.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  return { saveAboutInformation, isSavingAboutInformation };
};
