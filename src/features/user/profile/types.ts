import type { WorkExperience } from "@/server/db/schema/workExperiences";
import type { Duration } from "luxon";

export interface FormatDateRangeWithDurationParams {
  startDate: string;
  endDate?: string | null;
  localeStringFormat?: Intl.DateTimeFormatOptions;
}

export interface FormatDateRangeWithDurationReturn {
  formattedStartDate: string;
  formattedEndDate: string;
  difference: Duration;
}

export interface GroupedExperience {
  employer: string;
  experiences: WorkExperience[];
}
