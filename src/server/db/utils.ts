import { customType } from "drizzle-orm/mysql-core";
import { DateTime } from "luxon";

const mysqlDateTimeFormat = "yyyy-MM-dd HH:mm:ss" as const;
// Regex to match the `mysqlDateTimeFormat` pattern
const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const customTimestamp = customType<{
  data: string;
  driverData: string;
  config: { fsp: number };
}>({
  dataType(config) {
    const precision =
      typeof config?.fsp !== "undefined" ? ` (${config.fsp})` : "";
    return `timestamp${precision}`;
  },
  toDriver(input): string {
    if (timestampRegex.test(input)) {
      return input;
    }

    return DateTime.fromISO(input, {
      zone: "utc",
    }).toFormat(mysqlDateTimeFormat);
  },
  fromDriver(sqlDateTimeString) {
    return DateTime.fromSQL(sqlDateTimeString, {
      zone: "utc",
    }).toISO() as string;
  },
});

export const getCurrentTimestamp = (): string => {
  return DateTime.now().toUTC().toFormat(mysqlDateTimeFormat);
};
