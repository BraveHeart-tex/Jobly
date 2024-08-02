import type { Trx } from "@/lib/types";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { buildConflictUpdateColumns, db } from "@/server/db";
import {
  type Document,
  documents as documentSchema,
  documentSectionFields as fieldSchema,
  documentSectionFieldValues as fieldValueSchema,
  documentSections as sectionSchema,
} from "@/server/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import type { User } from "lucia";

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
    .values(sections)
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
    .values(fields)
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
    .values(fieldValues)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(fieldValueSchema, ["fieldId", "id"]),
    });
};

export const getDocumentWithSectionsAndFields = ({
  documentId,
  userId,
}: {
  documentId: Document["id"];
  userId: User["id"];
}) => {
  return db.query.documents.findFirst({
    where: and(
      eq(documentSchema.id, documentId),
      eq(documentSchema.userId, userId),
    ),
    with: {
      sections: {
        with: {
          fields: {
            orderBy: () => asc(fieldSchema.displayOrder),
            with: {
              fieldValues: true,
            },
          },
        },
      },
    },
  });
};

export const getDocumentsByUserId = (userId: User["id"]) => {
  return db
    .select()
    .from(documentSchema)
    .where(eq(documentSchema.userId, userId))
    .orderBy(desc(documentSchema.createdAt));
};

export const deleteDocumentById = (documentId: Document["id"]) => {
  return db.delete(documentSchema).where(eq(documentSchema.id, documentId));
};
