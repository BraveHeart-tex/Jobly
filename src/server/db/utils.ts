import { DateTime } from "luxon";

export const formatISODateTimeToUTC = (dateString: string) => {
  return DateTime.fromISO(dateString, {
    zone: "utc",
  }).toFormat("yyyy-MM-dd HH:mm:ss");
};

export const formatSqlDateToISO = (sqlDate: string): string => {
  return DateTime.fromSQL(sqlDate, { zone: "utc" }).toISO() as string;
};
