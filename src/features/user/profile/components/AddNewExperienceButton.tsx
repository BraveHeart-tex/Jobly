"use client";
import { Button } from "@/components/ui/button";
import { useProfilePageSearchParams } from "../hooks/useProfilePageSearchParams";
import { PlusIcon } from "lucide-react";

const AddNewExperienceButton = () => {
  const { openModal } = useProfilePageSearchParams();

  const handleNewExperienceClick = () => {
    openModal("workExperience/new");
  };

  return (
    <Button size="icon" variant={"ghost"} onClick={handleNewExperienceClick}>
      <PlusIcon />
    </Button>
  );
};

export default AddNewExperienceButton;
