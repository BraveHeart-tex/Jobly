"use client";
import { Button } from "@/components/ui/button";
import { useProfilePageSearchParams } from "../../hooks/useProfilePageSearchParams";
import { PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditWorkExperienceButtonProps {
  experienceId: number;
  className?: string;
}

const EditWorkExperienceButton = ({
  experienceId,
  className,
}: EditWorkExperienceButtonProps) => {
  const { openModal } = useProfilePageSearchParams();

  const handleEditExperienceClick = () => {};

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleEditExperienceClick}
            variant="ghost"
            size="icon"
            className={cn("w-8 h-8", className)}
          >
            <PenSquare size={22} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Work Experience</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditWorkExperienceButton;
