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

export interface GetCandidateAccountSettingsReturnType {
  userId: number;
  notificationSettings: CandidateNotificationSettings;
  privacySettings: {
    searchableProfile: boolean;
  };
}

export interface CandidateNotificationSettings {
  general: {
    jobRecommendations: boolean | null;
    applicationStatus: boolean | null;
  };
  email: {
    jobAlerts: boolean | null;
    suitableJobPostings: boolean | null;
    followedJobPostingClosingDates: boolean | null;
  };
}
