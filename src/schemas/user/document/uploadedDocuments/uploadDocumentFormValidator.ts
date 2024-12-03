import { documents } from "@/server/db/schema";
import {
  file,
  type InferOutput,
  maxSize,
  nonEmpty,
  object,
  picklist,
  pipe,
  string,
} from "valibot";

export const uploadDocumentFormValidator = object({
  title: pipe(string(), nonEmpty("Title is required")),
  type: pipe(
    picklist(documents.type.enumValues, "Type is required"),
    nonEmpty("Type is required"),
  ),
  file: pipe(
    file("Please select a file"),
    maxSize(1024 * 1024 * 4, "File size must be less than 4 MB"),
  ),
});

export type UploadDocumentFormData = InferOutput<
  typeof uploadDocumentFormValidator
>;
