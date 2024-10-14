"use client";
import { Button } from "@/components/ui/button";
import { useProfilePageSearchParams } from "../../profile/hooks/useProfilePageSearchParams";
import { PlusIcon } from "lucide-react";

const AddEducationalBackgroundButton = () => {
  const { openModal } = useProfilePageSearchParams();

  const handleNewExperienceClick = () => {
    openModal("educationalBackground/new");
  };

  return (
    <Button size="icon" variant={"ghost"} onClick={handleNewExperienceClick}>
      <PlusIcon />
    </Button>
  );
};

export default AddEducationalBackgroundButton;
