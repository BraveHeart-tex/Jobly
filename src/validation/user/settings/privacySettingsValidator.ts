import { boolean, type InferOutput, object } from "valibot";

export const privacySettingsValidator = object({
  searchableProfile: boolean(),
});

export type PrivacySettingsData = InferOutput<typeof privacySettingsValidator>;
