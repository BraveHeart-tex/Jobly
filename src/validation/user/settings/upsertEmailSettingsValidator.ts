import { boolean, nullable, object, type InferInput } from "valibot";

export const upsertEmailSettingsValidator = object({
  jobAlerts: nullable(boolean()),
  suitableJobPostings: nullable(boolean()),
  followedJobPostingClosingDates: nullable(boolean()),
});

export type UpsertEmailSettingsData = InferInput<
  typeof upsertEmailSettingsValidator
>;
