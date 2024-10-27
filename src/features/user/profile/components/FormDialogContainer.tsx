"use client";
import AboutSectionFormDialog from "@/features/user/profile/components/dialogs/AboutSectionFormDialog";
import EducationalBackgroundFormDialog from "@/features/user/profile/components/dialogs/EducationalBackgroundFormDialog";
import ProfileFormDialog from "@/features/user/profile/components/dialogs/ProfileFormDialog";
import SkillsDialog from "@/features/user/profile/components/dialogs/SkillsDialog";
import WorkExperienceFormDialog from "@/features/user/profile/components/dialogs/WorkExperienceFormDialog";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";

export const modalDialogMap = {
  about: AboutSectionFormDialog,
  "workExperience/new": WorkExperienceFormDialog,
  "workExperience/edit": WorkExperienceFormDialog,
  "educationalBackground/new": EducationalBackgroundFormDialog,
  "educationalBackground/edit": EducationalBackgroundFormDialog,
  personalDetails: ProfileFormDialog,
  "skills/new": SkillsDialog,
  "skills/edit": SkillsDialog,
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
