import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { DateTime, Interval } from "luxon";

export const formatExperienceDate = (dateString: string): string => {
  return DateTime.fromISO(dateString).toLocaleString({
    month: "long",
    year: "numeric",
  });
};

export const calculateDuration = (
  startDate: string,
  endDate: string,
): string => {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);
  const interval = Interval.fromDateTimes(start, end);

  const years = Math.floor(interval.length("years"));
  const months = Math.floor(interval.length("months") % 12);

  return generateHumanReadableDuration(years, months);
};

export const calculateTotalExperiencesDuration = (
  experiences: WorkExperience[],
): string => {
  const totalMonths = experiences.reduce((total, exp) => {
    const interval = Interval.fromDateTimes(
      DateTime.fromISO(exp.startDate),
      DateTime.fromISO(exp.endDate || DateTime.now().toISO()),
    );
    return total + interval.length("months");
  }, 0);

  const years = Math.floor(totalMonths / 12);
  const months = Math.floor(totalMonths % 12);

  return generateHumanReadableDuration(years, months);
};

export const generateHumanReadableDuration = (
  years: number,
  months: number,
): string => {
  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${
      months > 1 ? "s" : ""
    }`;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  return "less than a month";
};
