import { documents } from "@/server/db/schema";
import {
  type InferInput,
  isoDateTime,
  maxLength,
  nonEmpty,
  number,
  object,
  partial,
  picklist,
  pipe,
  required,
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
  createdAt: pipe(string(), isoDateTime()),
  updatedAt: pipe(string(), isoDateTime()),
});

export const DocumentInsertValidator = partial(DocumentValidator, [
  "id",
  "createdAt",
  "updatedAt",
  "userId",
]);

export const DocumentUpdateValidator = required(DocumentValidator, [
  "id",
  "title",
]);

export type DocumentUpdateData = InferInput<typeof DocumentUpdateValidator>;
