"use client";
import { CalendarDays, MapPin } from "lucide-react";
import { DateTime } from "luxon";
import { generateReadableEnumLabel } from "@/lib/utils/string";
import { useEffect, useRef, useState } from "react";
import { getDistanceBetweenElements } from "@/lib/utils";
import EditProfileRecordButton from "@/features/user/profile/components/EditProfileRecordButton";
import ExperienceDescription from "@/features/user/profile/workExperience/components/ExperienceDescription";
import type { ExperienceGroup } from "@/features/user/profile/workExperience/types";
import {
  calculateTotalExperiencesDuration,
  formatExperienceDate,
  calculateDuration,
} from "@/features/user/profile/workExperience/utils";

interface GroupedExperienceCardProps {
  group: ExperienceGroup;
}

const GroupedExperienceCard = ({ group }: GroupedExperienceCardProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [dotOffsets, setDotOffsets] = useState<{
    top: number;
    bottom: number;
  } | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!timelineRef.current) return;

    const dots = timelineRef.current.querySelectorAll(".timeline-dot");
    if (dots.length < 1) return;

    const firstDot = dots[0] as HTMLElement;
    const lastDot = dots[dots.length - 1] as HTMLElement;

    const distance = getDistanceBetweenElements(firstDot, lastDot);
    const BORDER_OVERFLOW_PX = 2;

    const top = firstDot.offsetTop + BORDER_OVERFLOW_PX;
    const bottom = lastDot.offsetTop + distance - BORDER_OVERFLOW_PX;

    setDotOffsets({ top, bottom });
    setLineHeight(bottom - top);
  }, [group.experiences]);

  return (
    <article className="relative flex">
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{group.employer}</h3>
          <span className="text-sm text-foreground/60">
            {calculateTotalExperiencesDuration(group.experiences)}
          </span>
        </div>

        <div className="space-y-4 pl-7 relative" ref={timelineRef}>
          {/* Timeline */}
          {dotOffsets && (
            <div
              className="absolute left-[0.98rem] w-px bg-muted-foreground/20"
              style={{ top: `${dotOffsets.top}px`, height: `${lineHeight}px` }}
            />
          )}
          {group.experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative group ${index !== 0 ? "mt-4 pt-4" : "mt-2"}`}
            >
              {/* Timeline Dot */}
              <div
                className={
                  "timeline-dot absolute left-[-1.25rem] flex items-center justify-center w-4 h-4  border rounded-full shadow-sm bg-background"
                }
                style={{
                  top: index === 0 ? "0.5rem" : "1.5rem",
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>

              <div className="flex items-center justify-between w-full">
                <h4 className="text-lg font-medium text-foreground">
                  {experience.jobTitle}
                </h4>
                <EditProfileRecordButton
                  modalLink="workExperience/edit"
                  recordId={experience.id}
                />
              </div>
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

              <ExperienceDescription description={experience.description} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default GroupedExperienceCard;
