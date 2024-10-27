"use client";
import { Button } from "@/components/ui/button";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import type { ModalDialogMapKey } from "@/features/user/profile/components/FormDialogContainer";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";

interface EditProfileRecordButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  modalLink: ModalDialogMapKey;
  recordId?: number;
}

const EditProfileRecordButton = ({
  modalLink,
  recordId,
  className,
  ...props
}: EditProfileRecordButtonProps) => {
  const { openModal } = useProfilePageSearchParams();

  const handleEditExperienceClick = () => {
    openModal(modalLink, recordId);
  };

  return (
    <Button
      onClick={handleEditExperienceClick}
      variant="ghost"
      size="icon"
      className={cn("w-8 h-8", className)}
      {...props}
    >
      <PencilIcon size={22} />
    </Button>
  );
};

export default EditProfileRecordButton;
