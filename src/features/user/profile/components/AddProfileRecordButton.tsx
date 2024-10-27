"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { ModalDialogMapKey } from "@/features/user/profile/components/FormDialogContainer";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";

interface AddProfileRecordButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  modalLink: ModalDialogMapKey;
}

const AddProfileRecordButton = ({
  modalLink,
  className,
  ...props
}: AddProfileRecordButtonProps) => {
  const { openModal } = useProfilePageSearchParams();

  const handleNewExperienceClick = () => {
    openModal(modalLink);
  };

  return (
    <Button
      size="icon"
      variant={"ghost"}
      className={cn("w-8 h-8", className)}
      onClick={handleNewExperienceClick}
      {...props}
    >
      <PlusIcon />
    </Button>
  );
};
export default AddProfileRecordButton;
