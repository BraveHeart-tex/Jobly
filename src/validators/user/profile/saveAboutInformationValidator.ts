import {
  type InferInput,
  array,
  nullish,
  number,
  object,
  string,
} from "valibot";

export const SaveAboutInformationValidator = object({
  bio: object({
    id: nullish(number()),
    content: string(),
  }),
  highlightedSkills: array(
    object({
      id: number(),
      name: string(),
      order: number(),
    }),
  ),
});

export type SaveAboutInformationInput = InferInput<
  typeof SaveAboutInformationValidator
>;
