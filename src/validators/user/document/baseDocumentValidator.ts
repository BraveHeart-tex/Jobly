import { documents } from "@/server/db/schema";
import { dateTimeValidator } from "@/validators/schemaUtils";
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

export const documentValidator = object({
  id: number(),
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    maxLength(512, "Title cannot exceed 512 characters"),
  ),
  userId: number(),
  type: pipe(picklist(documents.type.enumValues), nonEmpty("Type is required")),
  createdAt: dateTimeValidator,
  updatedAt: dateTimeValidator,
});

export const documentInsertValidator = partial(documentValidator, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const documentUpdateValidator = partial(documentValidator, [
  "userId",
  "createdAt",
  "updatedAt",
  "type",
]);

export type DocumentUpdateData = InferInput<typeof documentUpdateValidator>;
