import { documents } from "@/server/db/schema";
import { DateTimeValidator } from "@/validators/schemaUtils";
import {
  type InferInput,
  maxLength,
  nonEmpty,
  number,
  object,
  partial,
  picklist,
  pipe,
  string,
} from "valibot";

export const DocumentValidator = object({
  id: number(),
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    maxLength(512, "Title cannot exceed 512 characters"),
  ),
  userId: number(),
  type: pipe(picklist(documents.type.enumValues), nonEmpty("Type is required")),
  createdAt: DateTimeValidator,
  updatedAt: DateTimeValidator,
});

export const DocumentInsertValidator = partial(DocumentValidator, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const DocumentUpdateValidator = partial(DocumentValidator, [
  "userId",
  "createdAt",
  "updatedAt",
  "type",
]);

export type DocumentUpdateData = InferInput<typeof DocumentUpdateValidator>;
