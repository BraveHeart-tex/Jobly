import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { DateTime, type Duration } from "luxon";

interface FormatDateRangeWithDurationParams {
  startDate: string;
  endDate?: string | null;
  localeStringFormat?: Intl.DateTimeFormatOptions;
}

interface FormatDateRangeWithDurationReturn {
  formattedStartDate: string;
  formattedEndDate: string;
  difference: Duration;
}

export const formatDateRangeWithDuration = ({
  startDate,
  endDate,
  localeStringFormat = {
    year: "numeric",
    month: "short",
  },
}: FormatDateRangeWithDurationParams): FormatDateRangeWithDurationReturn => {
  const startDateValue = DateTime.fromISO(startDate);
  const endDateValue = endDate ? DateTime.fromISO(endDate) : undefined;

  const formattedStartDate = startDateValue.toLocaleString(localeStringFormat);

  const formattedEndDate = endDateValue
    ? endDateValue.toLocaleString(localeStringFormat)
    : "Current";

  const difference = (endDateValue || DateTime.now()).diff(startDateValue, [
    "years",
    "months",
  ]);

  return {
    formattedStartDate,
    formattedEndDate,
    difference,
  };
};

export interface GroupedExperience {
  employer: string;
  experiences: WorkExperience[];
}

const getEndDate = (date: string | null): DateTime => {
  return date ? DateTime.fromISO(date) : DateTime.now();
};

export const groupExperiences = (
  experiences: WorkExperience[],
): GroupedExperience[] => {
  const sortedExperiences = experiences.sort(
    (a, b) =>
      getEndDate(b.endDate).toMillis() - getEndDate(a.endDate).toMillis(),
  );

  const groupedExperiences: GroupedExperience[] = [];
  let currentGroup: GroupedExperience | null = null;

  for (const exp of sortedExperiences) {
    if (!currentGroup || currentGroup.employer !== exp.employer) {
      if (currentGroup) {
        groupedExperiences.push(currentGroup);
      }
      currentGroup = { employer: exp.employer, experiences: [exp] };
    } else {
      currentGroup.experiences.push(exp);
    }
  }

  if (currentGroup) {
    groupedExperiences.push(currentGroup);
  }

  return groupedExperiences;
};
