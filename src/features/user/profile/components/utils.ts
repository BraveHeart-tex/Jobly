import { DateTime } from "luxon";

interface FormatStartAndEndDateProps {
  startDate: string;
  endDate?: string | null;
  localeStringFormat?: Intl.DateTimeFormatOptions;
}

export const formatDateRangeWithDuration = ({
  startDate,
  endDate,
  localeStringFormat = {
    year: "numeric",
    month: "short",
  },
}: FormatStartAndEndDateProps) => {
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
