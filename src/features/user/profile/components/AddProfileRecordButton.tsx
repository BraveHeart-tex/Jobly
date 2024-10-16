"use client";
import { Button } from "@/components/ui/button";
import { useProfilePageSearchParams } from "../hooks/useProfilePageSearchParams";
import { PlusIcon } from "lucide-react";
import type { ModalDialogMapKey } from "./FormDialogContainer";

interface AddProfileRecordButtonProps {
  modalLink: ModalDialogMapKey;
}

const AddProfileRecordButton = ({ modalLink }: AddProfileRecordButtonProps) => {
  const { openModal } = useProfilePageSearchParams();

  const handleNewExperienceClick = () => {
    openModal(modalLink);
  };

  return (
    <Button size="icon" variant={"ghost"} onClick={handleNewExperienceClick}>
      <PlusIcon />
    </Button>
  );
};
export default AddProfileRecordButton;
