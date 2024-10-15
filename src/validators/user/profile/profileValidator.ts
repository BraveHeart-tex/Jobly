import { UrlValidator } from "@/validators/schemaUtils";
import {
  nonEmpty,
  nullable,
  number,
  object,
  pipe,
  rawCheck,
  string,
  type InferOutput,
} from "valibot";

export const ProfileValidator = pipe(
  object({
    firstName: pipe(string(), nonEmpty("First Name is required")),
    lastName: pipe(string(), nonEmpty("Last name is required")),
    title: pipe(string(), nonEmpty("Title is required")),
    sector: pipe(string(), nonEmpty("Sector is required")),
    presentedSchoolId: nullable(number()),
    presentedWorkExperienceId: nullable(number()),
    countryId: number(),
    cityId: nullable(number()),
    websiteLink: nullable(UrlValidator),
    websiteLinkText: nullable(string()),
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

export type ProfileData = InferOutput<typeof ProfileValidator>;
