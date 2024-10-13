"use client";
import { CalendarDays, MapPin } from "lucide-react";
import { calculateDuration, formatExperienceDate } from "../utils";
import { DateTime } from "luxon";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";
import ExperienceDescription from "./ExperienceDescription";
import EditWorkExperienceButton from "./EditWorkExperienceButton";

interface SingleExperienceCardProps {
  experience: WorkExperience;
}

const SingleExperienceCard = ({ experience }: SingleExperienceCardProps) => {
  const description = experience.description || "";

  return (
    <article>
      <div className="flex-grow">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              {experience.jobTitle}
            </h3>
            <EditWorkExperienceButton experienceId={experience.id} />
          </div>
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

        <ExperienceDescription description={description} />
      </div>
    </article>
  );
};

export default SingleExperienceCard;
