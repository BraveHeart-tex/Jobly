import { urlValidator } from "@/schemas/schemaUtils";
import {
  literal,
  nonEmpty,
  nullable,
  nullish,
  number,
  object,
  optional,
  pipe,
  rawCheck,
  string,
  union,
  type InferOutput,
} from "valibot";

export const profileValidator = pipe(
  object({
    id: optional(number()),
    firstName: pipe(string(), nonEmpty("First Name is required")),
    lastName: pipe(string(), nonEmpty("Last name is required")),
    title: nullable(string()),
    sector: nullable(string()),
    presentedWorkExperienceId: nullish(number()),
    countryId: nullish(number()),
    cityId: nullish(number()),
    websiteLink: union([nullable(urlValidator), literal("")]),
    websiteLinkText: nullable(string()),
    selectedCountry: nullable(
      object({
        label: string(),
        value: number(),
      }),
    ),
    selectedCity: nullable(
      object({
        label: string(),
        value: number(),
      }),
    ),
  }),
  rawCheck(({ dataset, addIssue }) => {
    if (!dataset.typed) return;
    const { websiteLink, websiteLinkText } = dataset.value;

    if (!websiteLink && websiteLinkText) {
      addIssue({
        path: [
          {
            key: "websiteLink",
            value: dataset.value.websiteLink,
            origin: "value",
            type: "object",
            input: dataset.value,
          },
        ],
        message: "Website link is required.",
      });
    }
  }),
);

export type ProfileData = InferOutput<typeof profileValidator>;
