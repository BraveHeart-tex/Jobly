import {
  type InferOutput,
  check,
  literal,
  maxLength,
  nonEmpty,
  object,
  optional,
  pipe,
  regex,
  string,
  union,
} from "valibot";
import { UrlValidator } from "./schemaUtils";

const currentYear = new Date().getFullYear();
const MIN_YEAR_OF_ESTABLISHMENT = 1800 as const;

const yearOfEstablishmentSchema = pipe(
  string(),
  nonEmpty("Year is required"),
  maxLength(4, "Year should not exceed 4 digits"),
  regex(/^\d+$/, "Year must contain only digits"),
  check((input) => {
    const year = Number.parseInt(input, 10);
    return year >= MIN_YEAR_OF_ESTABLISHMENT && year <= currentYear;
  }, `Year must be between ${MIN_YEAR_OF_ESTABLISHMENT} and ${currentYear}`),
);

export const CompanyProfileValidator = object({
  name: pipe(string(), nonEmpty("Company name is required")),
  bio: pipe(string(), nonEmpty("Please provide a short bio about the company")),
  website: union([UrlValidator, literal("")]),
  industry: pipe(string(), nonEmpty("Company industry is required")),
  address: optional(string(), ""),
  yearOfEstablishment: yearOfEstablishmentSchema,
  companySize: pipe(string(), nonEmpty("Company size is required")),
  areasOfExpertise: optional(string(), ""),
  logo: optional(string(), ""),
  coverImage: optional(string(), ""),
  description: optional(string(), ""),
});

export type CompanyProfileOutput = InferOutput<typeof CompanyProfileValidator>;
