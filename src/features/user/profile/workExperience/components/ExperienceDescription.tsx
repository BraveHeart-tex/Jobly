"use client";

import { Button } from "@/components/ui/button";
import { useTruncatedText } from "@/hooks/useTruncatedText";
import { MAX_VISIBLE_EXPERIENCE_DESCRIPTION_CHARACTERS } from "@/lib/constants";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceDescriptionProps {
  description: string | null;
}

const ExperienceDescription = ({ description }: ExperienceDescriptionProps) => {
  const { isExpanded, setIsExpanded, shouldShowToggleButton, truncatedText } =
    useTruncatedText(
      description || "",
      MAX_VISIBLE_EXPERIENCE_DESCRIPTION_CHARACTERS,
    );

  if (!description) return null;

  return (
    <>
      <p className="py-4 text-[0.93rem] whitespace-pre">
        {isExpanded ? description : truncatedText}
      </p>
      {shouldShowToggleButton && (
        <div className="flex justify-end">
          <Button
            variant="link"
            className="h-8 text-sm font-medium"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? (
              <div className="flex items-center gap-1">
                Show Less <ChevronUp className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                Show More <ChevronDown className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default ExperienceDescription;
