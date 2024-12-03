import { boolean, type InferOutput, object } from "valibot";

export const candidateNotificationSettingsValidator = object({
  jobRecommendations: boolean(),
  applicationStatus: boolean(),
});

export type CandidateNotificationSettingsData = InferOutput<
  typeof candidateNotificationSettingsValidator
>;
