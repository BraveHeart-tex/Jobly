"use client";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import AboutSectionDialog from "./dialogs/AboutSectionDialog";
import type { ReactElement } from "react";

const modalDialogMap: {
  [key: string]: () => ReactElement;
} = {
  about: AboutSectionDialog,
};

const ProfileFormDialogContainer = () => {
  const { modalQuery } = useProfilePageSearchParams();
  if (!modalQuery) return null;

  const DialogComponent = modalDialogMap[modalQuery];
  if (!DialogComponent) return null;

  return <DialogComponent />;
};

export default ProfileFormDialogContainer;
