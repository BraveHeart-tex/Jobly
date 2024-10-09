import { Card } from "@/components/ui/card";
import { Building2, CalendarDays, Clock, MapPin } from "lucide-react";
import {
  calculateDuration,
  calculateTotalExperiencesDuration,
  formatExperienceDate,
} from "../utils";
import { DateTime } from "luxon";
import type { ExperienceGroup } from "../types";

interface GroupedExperienceCardProps {
  group: ExperienceGroup;
}

const GroupedExperienceCard = ({ group }: GroupedExperienceCardProps) => (
  <Card className="p-6 bg-white shadow-sm">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">
            {group.employer}
          </h3>
          <span className="text-sm text-gray-500">
            Total: {calculateTotalExperiencesDuration(group.experiences)}
          </span>
        </div>

        <div className="space-y-4">
          {group.experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={
                index !== 0 ? "mt-4 pt-4 border-t border-gray-200" : "mt-2"
              }
            >
              <h4 className="text-lg font-medium text-gray-800">
                {experience.jobTitle}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>
                    {formatExperienceDate(experience.startDate)} -{" "}
                    {experience.endDate
                      ? formatExperienceDate(experience.endDate)
                      : "Present"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    {calculateDuration(
                      experience.startDate,
                      experience.endDate || DateTime.now().toISO(),
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>
                    {experience.location} · {experience.workType}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

export default GroupedExperienceCard;
