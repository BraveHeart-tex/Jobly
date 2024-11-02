import type { InferValueTypeFromConst } from "@/lib/types";

export interface UpdateEmailNotificationSettingParams {
  userId: number;
  settingKey: EmailNotificationSettingKey;
  settingValue: boolean;
}

export const emailNotificationSettingKeys = {
  JOB_ALERTS: "jobAlerts",
  SUITABLE_JOB_POSTINGS: "suitableJobPostings",
  FOLLOWED_JOB_POSTING_CLOSING_DATES: "followedJobPostingClosingDates",
} as const;

export type EmailNotificationSettingKey = InferValueTypeFromConst<
  typeof emailNotificationSettingKeys
>;
