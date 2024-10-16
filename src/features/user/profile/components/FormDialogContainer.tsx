"use client";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import AboutSectionFormDialog from "./dialogs/AboutSectionFormDialog";
import WorkExperienceFormDialog from "./dialogs/WorkExperienceFormDialog";
import EducationalBackgroundFormDialog from "./dialogs/EducationalBackgroundFormDialog";
import ProfileFormDialog from "./dialogs/ProfileFormDialog";

export const modalDialogMap = {
  about: AboutSectionFormDialog,
  "workExperience/new": WorkExperienceFormDialog,
  "workExperience/edit": WorkExperienceFormDialog,
  "educationalBackground/new": EducationalBackgroundFormDialog,
  "educationalBackground/edit": EducationalBackgroundFormDialog,
  personalDetails: ProfileFormDialog,
} as const;

export type ModalDialogMapKey = keyof typeof modalDialogMap;

const FormDialogContainer = () => {
  const { modalQuery } = useProfilePageSearchParams();
  if (!modalQuery) return null;

  const DialogComponent = modalDialogMap[modalQuery];
  if (!DialogComponent) return null;

  return <DialogComponent />;
};

export default FormDialogContainer;
