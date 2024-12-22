import type { Transaction } from "@/lib/types";
import type { DocumentUpdateData } from "@/schemas/user/document/baseDocumentValidator";
import { buildConflictUpdateColumns, db } from "@/server/db";
import {
  documentSectionFields,
  documentSections,
  documents,
} from "@/server/db/schema";
import type {
  DocumentSectionField,
  DocumentSectionFieldInsertModel,
} from "@/server/db/schema/documentSectionFields";
import type { DocumentSectionInsertModel } from "@/server/db/schema/documentSections";
import type {
  DocumentInsertModel,
  DocumentSelectModel,
} from "@/server/db/schema/documents";
import type { DBUser } from "@/server/db/schema/users";
import { and, asc, desc, eq, inArray } from "drizzle-orm";

export const insertDocument = async (
  documentValues: DocumentInsertModel,
  trx?: Transaction,
) => {
  const dbLayer = trx || db;
  const [result] = await dbLayer
    .insert(documents)
    .values(documentValues)
    .onDuplicateKeyUpdate({
      set: documentValues,
    });

  return result?.insertId;
};

export const upsertSections = (
  trx: Transaction,
  sectionValues: DocumentSectionInsertModel[],
) => {
  if (sectionValues.length === 0) return;
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
  if (fields.length === 0) return [];
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

export const getDocumentWithSectionsAndFields = ({
  documentId,
  userId,
  source,
}: {
  documentId: DocumentSelectModel["id"];
  userId: DBUser["id"];
  source: DocumentSelectModel["source"];
}) => {
  return db.query.documents.findFirst({
    where: and(
      eq(documents.id, documentId),
      eq(documents.userId, userId),
      eq(documents.source, source),
    ),
    with: {
      sections: {
        with: {
          fields: {
            orderBy: () => asc(documentSectionFields.displayOrder),
          },
        },
      },
    },
  });
};

export const getDocumentsByUserId = (
  userId: DBUser["id"],
  source: DocumentSelectModel["source"],
) => {
  return db
    .select()
    .from(documents)
    .where(and(eq(documents.userId, userId), eq(documents.source, source)))
    .orderBy(desc(documents.createdAt));
};

export const deleteDocumentById = ({
  documentId,
  userId,
}: {
  documentId: DocumentSelectModel["id"];
  userId: DBUser["id"];
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

export const getUserUploadedDocuments = async (userId: DBUser["id"]) => {
  return await db
    .select()
    .from(documents)
    .where(and(eq(documents.userId, userId), eq(documents.source, "upload")));
};
