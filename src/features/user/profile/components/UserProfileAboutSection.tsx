"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { ChevronDown, ChevronUp, PenSquare, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface UserProfileAboutSectionProps {
  bio: string;
  highlightedSkills: string[];
}

const MAX_VISIBLE_CHARACTERS = 300;

const UserProfileAboutSection = ({
  bio,
  highlightedSkills,
}: UserProfileAboutSectionProps) => {
  const { openModal } = useProfilePageSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  const truncatedBio =
    bio.slice(0, MAX_VISIBLE_CHARACTERS) +
    (bio.length > MAX_VISIBLE_CHARACTERS ? "..." : "");

  useEffect(() => {
    setShouldShowButton(bio.length > MAX_VISIBLE_CHARACTERS);
  }, [bio]);

  if (!bio && highlightedSkills.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">About</h2>
            <Button
              size="icon"
              variant={"ghost"}
              onClick={() => {
                openModal("about");
              }}
            >
              <PenSquare />
            </Button>
          </div>

          <div className="relative">
            <p className="py-4 text-[0.93rem] whitespace-pre">
              {isExpanded ? bio : truncatedBio}
            </p>

            {shouldShowButton && (
              <div className="flex justify-end">
                <Button
                  variant="link"
                  className="mt-1 h-8 text-sm font-medium"
                  onClick={() => setIsExpanded(!isExpanded)}
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
          </div>

          {highlightedSkills.length > 0 ? (
            <div className="rounded-md border p-3">
              <div className="flex gap-2">
                <SparklesIcon className="mt-[2px]" />
                <div>
                  <>
                    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                      Most Important Skills
                    </h4>
                    <p>{highlightedSkills.join(" • ")}</p>
                  </>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileAboutSection;
