import { boolean, object, optional, parse } from "valibot";

export const referencesSectionMetadataValidator = object({
  hideReferences: optional(boolean(), false),
});

export const parseReferencesMetadata = (input: string | null) => {
  if (!input) return { hideReferences: false };

  try {
    const result = parse(referencesSectionMetadataValidator, JSON.parse(input));
    return result;
  } catch (error) {
    console.info("Error parsing references section metadata:", error);
    return {
      hideReferences: false,
    };
  }
};
