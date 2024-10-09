"use client";
import { CalendarDays, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { calculateDuration, formatExperienceDate } from "../utils";
import { DateTime } from "luxon";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SingleExperienceCardProps {
  experience: WorkExperience;
}

const MAX_VISIBLE_DESCRIPTION_CHARACTERS = 120 as const;

const SingleExperienceCard = ({ experience }: SingleExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = experience.description || "";

  const shouldShowToggleButton =
    description.length > MAX_VISIBLE_DESCRIPTION_CHARACTERS;

  const truncatedDescription =
    description.slice(0, MAX_VISIBLE_DESCRIPTION_CHARACTERS) +
    (description.length > MAX_VISIBLE_DESCRIPTION_CHARACTERS ? "..." : "");

  return (
    <article>
      <div className="flex-grow">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {experience.jobTitle}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-foreground/70 text-sm">
            <h4>{experience.employer}</h4>
            {" • "}
            <span>{generateReadableEnumLabel(experience.employmentType)}</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-foreground/60">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>
                {formatExperienceDate(experience.startDate)} -{" "}
                {experience.endDate
                  ? formatExperienceDate(experience.endDate)
                  : "Present"}
              </span>
              {" • "}
              <span>
                {calculateDuration(
                  experience.startDate,
                  experience.endDate || DateTime.now().toISO(),
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{generateReadableEnumLabel(experience.workType)}</span>
          </div>
        </div>

        <p className="py-4 text-[0.93rem] whitespace-pre">
          {isExpanded ? description : truncatedDescription}
        </p>

        {shouldShowToggleButton && (
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
    </article>
  );
};

export default SingleExperienceCard;
