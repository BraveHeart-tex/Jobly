"use client";
import { CalendarDays, MapPin } from "lucide-react";
import {
  calculateDuration,
  calculateTotalExperiencesDuration,
  formatExperienceDate,
} from "../utils";
import { DateTime } from "luxon";
import type { ExperienceGroup } from "../types";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";

interface GroupedExperienceCardProps {
  group: ExperienceGroup;
}

const GroupedExperienceCard = ({ group }: GroupedExperienceCardProps) => (
  <article>
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{group.employer}</h3>
        <span className="text-sm text-foreground/60">
          {calculateTotalExperiencesDuration(group.experiences)}
        </span>
      </div>

      <div className="space-y-4">
        {group.experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={index !== 0 ? "mt-4 pt-4 border-t" : "mt-2"}
          >
            <h4 className="text-lg font-medium text-foreground">
              {experience.jobTitle}
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-foreground/60">
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

            <div className="flex items-center gap-1 text-foreground/60 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{generateReadableEnumLabel(experience.workType)}</span>
            </div>

            <p className="py-4 text-[0.93rem] whitespace-pre">
              {experience.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </article>
);

export default GroupedExperienceCard;
