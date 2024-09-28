"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetProfileAboutSection } from "@/features/user/profile/hooks/useGetProfileAboutSection";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";

const AboutSectionDialog = () => {
  const { closeModal } = useProfilePageSearchParams();
  const { data, isPending } = useGetProfileAboutSection();

  // You can talk about your length of experience, your industry and your skills. Other people also mention their achievements or previous work experience.

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeModal();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
          <DialogDescription>
            Use the form below to edit your about section content.
          </DialogDescription>
        </DialogHeader>
        {isPending ? (
          <div>Loading...</div>
        ) : (
          <>{JSON.stringify(data, null, 2)}</>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AboutSectionDialog;
