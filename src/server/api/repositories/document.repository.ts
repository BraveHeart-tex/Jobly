import type { Trx } from "@/lib/types";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { buildConflictUpdateColumns } from "@/server/db";
import {
  documents as documentSchema,
  documentSectionFields as fieldSchema,
  documentSectionFieldValues as fieldValueSchema,
  documentSections as sectionSchema,
} from "@/server/db/schema";

export const upsertDocument = async (
  trx: Trx,
  document: SaveDocumentDetailsSchema["document"],
) => {
  return trx.insert(documentSchema).values(document).onDuplicateKeyUpdate({
    set: document,
  });
};

export const upsertSections = (
  trx: Trx,
  sections: SaveDocumentDetailsSchema["sections"],
) => {
  return trx
    .insert(sectionSchema)
    .values(sections.map((sectionData) => sectionData))
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(sectionSchema, ["id", "documentId"]),
    });
};

export const upsertSectionFields = (
  trx: Trx,
  fields: SaveDocumentDetailsSchema["fields"],
) => {
  return trx
    .insert(fieldSchema)
    .values(fields.map((fieldData) => fieldData))
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(fieldSchema, ["id", "sectionId"]),
    });
};

export const upsertSectionFieldValues = (
  trx: Trx,
  fieldValues: SaveDocumentDetailsSchema["fieldValues"],
) => {
  return trx
    .insert(fieldValueSchema)
    .values(fieldValues.map((fieldValue) => fieldValue))
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(fieldValueSchema, ["fieldId", "id"]),
    });
};
