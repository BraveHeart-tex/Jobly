import { DateTime } from "luxon";

export const formatToMediumDateTimeWithWeekday = (value: string) => {
  return DateTime.fromISO(value).toLocaleString(
    DateTime.DATETIME_MED_WITH_WEEKDAY,
  );
};
