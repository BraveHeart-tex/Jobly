import { boolean, getDefaults, object, optional, parse } from "valibot";

const skillsSectionMetadataValidator = object({
  showExperienceLevel: optional(boolean(), true),
  isCommaSeparated: optional(boolean(), false),
});

export const parseSkillsMetadata = (input?: string | null) => {
  if (!input) {
    return getDefaults(skillsSectionMetadataValidator);
  }

  try {
    const result = parse(skillsSectionMetadataValidator, JSON.parse(input));
    return result;
  } catch (error) {
    console.error("Error parsing skills section metadata:", error);
    return getDefaults(skillsSectionMetadataValidator);
  }
};

export type SkillMetadataKey =
  keyof typeof skillsSectionMetadataValidator.entries;
