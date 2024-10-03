import type { Transaction } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import {
  documentSectionFieldValues,
  documentSectionFields,
  documentSections,
  documents,
} from "@/server/db/schema";
import type { DocumentSectionFieldValueInsertModel } from "@/server/db/schema/documentSectionFieldValues";
import type {
  DocumentSectionField,
  DocumentSectionFieldInsertModel,
} from "@/server/db/schema/documentSectionFields";
import type { DocumentSectionInsertModel } from "@/server/db/schema/documentSections";
import type {
  DocumentInsertModel,
  DocumentSelectModel,
} from "@/server/db/schema/documents";
import type { DocumentUpdateData } from "@/validators/user/document/baseDocumentValidator";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import type { User } from "lucia";

export const upsertDocument = async (
  trx: Transaction,
  documentValues: DocumentInsertModel,
) => {
  return trx
    .insert(documents)
    .values(documentValues)
    .onDuplicateKeyUpdate({
      set: documentValues,
    })
    .$returningId();
};

export const upsertSections = (
  trx: Transaction,
  sectionValues: DocumentSectionInsertModel[],
) => {
  return trx
    .insert(documentSections)
    .values(sectionValues)
    .onDuplicateKeyUpdate({
      set: buildConflictUpdateColumns(documentSections, ["id", "documentId"]),
    });
};

export const upsertSectionFields = (
  trx: Transaction,
  fields: DocumentSectionFieldInsertModel[],
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
  trx: Transaction,
  fieldValues: DocumentSectionFieldValueInsertModel[],
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

export const updateDocumentById = (input: DocumentUpdateData) => {
  return db.update(documents).set(input).where(eq(documents.id, input.id));
};
