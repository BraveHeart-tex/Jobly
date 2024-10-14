"use client";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import AboutSectionDialog from "./dialogs/AboutSectionFormDialog";
import WorkExperienceDialog from "./dialogs/WorkExperienceFormDialog";
import EducationalBackgroundForm from "../../educationalBackgrounds/components/EducationalBackgroundForm";

export const modalDialogMap = {
  about: AboutSectionDialog,
  "workExperience/new": WorkExperienceDialog,
  "workExperience/edit": WorkExperienceDialog,
  "educationalBackground/new": EducationalBackgroundForm,
} as const;

export type ModalDialogMapKey = keyof typeof modalDialogMap;

const ProfileFormDialogContainer = () => {
  const { modalQuery } = useProfilePageSearchParams();
  if (!modalQuery) return null;

  const DialogComponent = modalDialogMap[modalQuery];
  if (!DialogComponent) return null;

  return <DialogComponent />;
};

export default ProfileFormDialogContainer;
