"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";

const AboutSectionDialog = () => {
  const { closeModal } = useProfilePageSearchParams();

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
      </DialogContent>
    </Dialog>
  );
};

export default AboutSectionDialog;
