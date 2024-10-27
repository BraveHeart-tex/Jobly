"use client";
import { Button } from "@/components/ui/button";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { ListOrderedIcon } from "lucide-react";

const OpenSkillOrderDialogButton = () => {
  const { openModal } = useProfilePageSearchParams();

  const handleOpenSkillOrderDialog = () => {
    openModal("skills/reorder");
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleOpenSkillOrderDialog}
      className="w-8 h-8"
    >
      <ListOrderedIcon />
    </Button>
  );
};
export default OpenSkillOrderDialogButton;
