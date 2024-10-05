import { jobPostings } from "@/server/db/schema";
import {
  boolean,
  nullish,
  number,
  object,
  optional,
  picklist,
  string,
  type InferOutput,
} from "valibot";

export const GetJobListingsValidator = object({
  query: optional(string(), ""),
  page: optional(number(), 1),
  bookmarked: optional(boolean(), false),
  viewed: optional(boolean(), false),
  workType: nullish(picklist(jobPostings.workType.enumValues)),
  employmentType: nullish(picklist(jobPostings.employmentType.enumValues)),
});

export type GetJobListingsOutput = InferOutput<typeof GetJobListingsValidator>;
