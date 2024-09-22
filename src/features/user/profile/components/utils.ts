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
