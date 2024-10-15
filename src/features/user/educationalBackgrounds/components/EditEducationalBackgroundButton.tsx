"use client";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfilePageSearchParams } from "../../profile/hooks/useProfilePageSearchParams";

interface EditEducationalBackgroundButtonProps {
  educationalBackgroundId: number;
  className?: string;
}

const EditEducationalBackgroundButton = ({
  educationalBackgroundId,
  className,
}: EditEducationalBackgroundButtonProps) => {
  const { openModal } = useProfilePageSearchParams();

  const handleEditExperienceClick = () => {
    openModal("educationalBackground/edit", educationalBackgroundId);
  };
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
        <TooltipContent>Edit Educational Background</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default EditEducationalBackgroundButton;
