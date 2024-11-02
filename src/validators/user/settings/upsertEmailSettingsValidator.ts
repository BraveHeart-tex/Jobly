import { boolean, object, type InferInput } from "valibot";

export const upsertEmailSettingsValidator = object({
  jobAlerts: boolean(),
  suitableJobPostings: boolean(),
  followedJobPostingClosingDates: boolean(),
});

export type UpsertEmailSettingsData = InferInput<
  typeof upsertEmailSettingsValidator
>;
