import { documentSections } from "@/server/db/schema";
import {
  type InferInput,
  maxLength,
  minValue,
  nonEmpty,
  number,
  object,
  optional,
  partial,
  picklist,
  pipe,
  required,
  string,
} from "valibot";

export const DocumentSectionValidator = object({
  id: number(),
  documentId: number(),
  name: pipe(
    string(),
    nonEmpty("Name is required"),
    maxLength(100, "Name cannot exceed 100 characters"),
  ),
  fieldsContainerType: optional(
    picklist(documentSections.fieldsContainerType.enumValues),
    "static",
  ),
  displayOrder: pipe(
    number(),
    minValue(1, "Display order must be greater than or equal to 1"),
  ),
  internalSectionTag: pipe(
    picklist(documentSections.internalSectionTag.enumValues),
    nonEmpty("Internal section tag is required"),
  ),
  defaultName: pipe(
    string(),
    nonEmpty("Default name is required"),
    maxLength(100, "Default name cannot exceed 100 characters"),
  ),
  itemCountPerContainer: optional(number()),
  metadata: optional(string()),
});

export const DocumentSectionInsertValidator = partial(
  DocumentSectionValidator,
  ["id"],
);

export type DocumentSectionInsertData = InferInput<
  typeof DocumentSectionInsertValidator
>;

export const DocumentSectionUpdateValidator = required(
  DocumentSectionValidator,
  ["id"],
);
