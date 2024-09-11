import type { MakeFieldsRequired, Trx } from "@/lib/types";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { buildConflictUpdateColumns, db } from "@/server/db";
import {
  documentSectionFieldValues,
  documentSectionFields,
  documentSections,
  documents,
} from "@/server/db/schema";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import type { User } from "lucia";

export const upsertDocument = async (
  trx: Trx,
  documentValues: SaveDocumentDetailsSchema["document"],
) => {
  return trx
    .insert(documents)
    .values(documentValues)
    .onDuplicateKeyUpdate({
      set: document,
    })
    .$returningId();
};

export const upsertSections = (
  trx: Trx,
  sectionValues: SaveDocumentDetailsSchema["sections"],
) => {
  return trx
    .insert(documentSections)
    .values(sectionValues)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(documentSections, ["id", "documentId"]),
    });
};

export const upsertSectionFields = (
  trx: Trx,
  fields: SaveDocumentDetailsSchema["fields"],
) => {
  return trx
    .insert(documentSectionFields)
    .values(fields)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(documentSectionFields, [
        "id",
        "sectionId",
      ]),
    })
    .$returningId();
};

export const upsertSectionFieldValues = (
  trx: Trx,
  fieldValues: SaveDocumentDetailsSchema["fieldValues"],
) => {
  return trx
    .insert(documentSectionFieldValues)
    .values(fieldValues)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(documentSectionFieldValues, [
        "fieldId",
        "id",
      ]),
    });
};

export const getDocumentWithSectionsAndFields = ({
  documentId,
  userId,
}: {
  documentId: DocumentSelectModel["id"];
  userId: User["id"];
}) => {
  return db.query.documents.findFirst({
    where: and(eq(documents.id, documentId), eq(documents.userId, userId)),
    with: {
      sections: {
        with: {
          fields: {
            orderBy: () => asc(documentSectionFields.displayOrder),
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
    .from(documents)
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.createdAt));
};

export const deleteDocumentById = ({
  documentId,
  userId,
}: {
  documentId: DocumentSelectModel["id"];
  userId: User["id"];
}) => {
  return db
    .delete(documents)
    .where(and(eq(documents.id, documentId), eq(documents.userId, userId)));
};

export const bulkDeleteFields = (fieldIds: DocumentSectionField["id"][]) => {
  return db
    .delete(documentSectionFields)
    .where(inArray(documentSectionFields.id, fieldIds));
};

export const updateDocumentById = (
  input: MakeFieldsRequired<Partial<DocumentSelectModel>, "id">,
) => {
  return db.update(documents).set(input).where(eq(documents.id, input.id));
};
