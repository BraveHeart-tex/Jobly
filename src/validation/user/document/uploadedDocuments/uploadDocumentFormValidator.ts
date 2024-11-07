import { documents } from "@/server/db/schema";
import {
  file,
  type InferOutput,
  maxSize,
  nonEmpty,
  object,
  omit,
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
    maxSize(1024 * 1024, "File size must be less than 1 MB"),
  ),
});

export const uploadFormActionValidator = object({
  ...omit(uploadDocumentFormValidator, ["file"]).entries,
  url: pipe(string(), nonEmpty("URL is required")),
  fileExtension: pipe(string(), nonEmpty("File extension is required")),
});

export type UploadDocumentFormData = InferOutput<
  typeof uploadDocumentFormValidator
>;
