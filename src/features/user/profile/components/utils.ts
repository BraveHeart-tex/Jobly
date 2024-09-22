import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { DateTime, type Duration, Interval } from "luxon";

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

export interface GroupedExperience extends WorkExperience {
  experiences: WorkExperience[];
}

const getEndDate = (date: string | null): DateTime => {
  return date ? DateTime.fromISO(date) : DateTime.now();
};

const dateRangesOverlap = (
  start1: string,
  end1: string | null,
  start2: string,
  end2: string | null,
): boolean => {
  const interval1 = Interval.fromDateTimes(
    DateTime.fromISO(start1),
    getEndDate(end1),
  );
  const interval2 = Interval.fromDateTimes(
    DateTime.fromISO(start2),
    getEndDate(end2),
  );
  return interval1.overlaps(interval2);
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
    if (
      !currentGroup ||
      currentGroup.employer !== exp.employer ||
      !dateRangesOverlap(
        currentGroup.startDate,
        currentGroup.endDate,
        exp.startDate,
        exp.endDate,
      )
    ) {
      if (currentGroup) {
        groupedExperiences.push(currentGroup);
      }
      currentGroup = { ...exp, experiences: [exp] };
    } else {
      currentGroup.experiences.push(exp);
      currentGroup.startDate =
        DateTime.fromISO(exp.startDate) <
        DateTime.fromISO(currentGroup.startDate)
          ? exp.startDate
          : currentGroup.startDate;
      currentGroup.endDate =
        getEndDate(exp.endDate) > getEndDate(currentGroup.endDate)
          ? exp.endDate
          : currentGroup.endDate;
    }
  }

  if (currentGroup) {
    groupedExperiences.push(currentGroup);
  }

  return groupedExperiences;
};
