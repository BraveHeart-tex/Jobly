"use client";
import { Button } from "@/components/ui/button";
import type { HTMLAttributes } from "react";
import { useProfilePageSearchParams } from "../hooks/useProfilePageSearchParams";
import type { ModalDialogMapKey } from "./ProfileFormDialogContainer";
import { cn } from "@/lib/utils";
import { PenSquare } from "lucide-react";

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
      <PenSquare size={22} />
    </Button>
  );
};

export default EditProfileRecordButton;
