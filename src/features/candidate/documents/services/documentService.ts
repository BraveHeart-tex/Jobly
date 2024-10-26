"use server";
import type { DocumentBuilderConfig } from "@/features/candidate/document-builder/types";
import {
  bulkDeleteFields,
  deleteDocumentById,
  getDocumentWithSectionsAndFields,
  getDocumentsByUserId,
  updateDocumentById,
  upsertDocument,
  upsertSectionFields,
  upsertSections,
} from "@/features/candidate/documents/repositories/documentRepository";
import {
  getFieldInsertTemplateBySectionTag,
  getPredefinedDocumentSectionsWithDocumentId,
  makeFieldInsertDTOs,
  normalizeDocumentStructure,
} from "@/features/candidate/documents/utils";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import {
  documentSectionFields as fieldSchema,
  documentSections as sectionSchema,
} from "@/server/db/schema";
import type {
  DocumentSectionField,
  DocumentSectionFieldInsertModel,
} from "@/server/db/schema/documentSectionFields";
import type {
  DocumentSection,
  DocumentSectionInsertModel,
} from "@/server/db/schema/documentSections";
import type {
  DocumentInsertModel,
  DocumentSelectModel,
} from "@/server/db/schema/documents";
import type { DocumentUpdateData } from "@/validators/user/document/baseDocumentValidator";
import type { SaveDocumentDetailsData } from "@/validators/user/document/saveDocumentDetailsValidator";
import { eq } from "drizzle-orm";
import type { User } from "lucia";

export const getUserDocuments = async (userId: User["id"]) => {
  return getDocumentsByUserId(userId);
};

export const deleteDocument = async ({
  documentId,
  userId,
}: {
  documentId: DocumentSelectModel["id"];
  userId: User["id"];
}) => {
  return deleteDocumentById({
    documentId,
    userId,
  });
};

export const updateDocument = async (input: DocumentUpdateData) => {
  return updateDocumentById(input);
};

export const createDocumentAndRelatedEntities = async (
  documentCreateInput: DocumentInsertModel,
) => {
  return await db.transaction(async (trx) => {
    const documentId = await upsertDocument(trx, documentCreateInput);

    if (!documentId) {
      trx.rollback();
      return;
    }

    const sectionInsertTemplates =
      getPredefinedDocumentSectionsWithDocumentId(documentId);

    const sectionInsertIds = await insertSections(trx, sectionInsertTemplates);

    const hasSectionInsertFailures =
      sectionInsertTemplates.length !== sectionInsertIds.length;

    if (hasSectionInsertFailures) {
      trx.rollback();
      return;
    }

    const fieldInsertDTOs = makeFieldInsertDTOs(
      sectionInsertTemplates.map((item, index) => ({
        ...item,
        id: sectionInsertIds[index] as DocumentSection["id"],
      })),
    );
    const fieldInsertIds = (
      await upsertSectionFields(trx, fieldInsertDTOs)
    ).map((result) => result.id);

    const hasFieldInsertFailures =
      fieldInsertDTOs.length !== fieldInsertIds.length;

    if (hasFieldInsertFailures) {
      trx.rollback();
      return;
    }

    return documentId;
  });
};

const insertSections = async (
  trx: Transaction,
  sections: DocumentSectionInsertModel[],
) => {
  const result = await trx
    .insert(sectionSchema)
    .values(sections.map((section) => section))
    .$returningId();

  return result.map((item) => item.id);
};

const insertFields = async (
  trx: Transaction,
  sectionId: DocumentSection["id"],
  fields: Omit<DocumentSectionFieldInsertModel, "sectionId">[],
) => {
  const result = await trx
    .insert(fieldSchema)
    .values(
      fields.map((field) => ({
        ...field,
        sectionId,
      })),
    )
    .$returningId();

  return result.map((item) => item.id);
};

export const getDocumentDetails = async ({
  id,
  userId,
}: {
  id: DocumentSelectModel["id"];
  userId: User["id"];
}): Promise<DocumentBuilderConfig | { error: string }> => {
  const document = await getDocumentWithSectionsAndFields({
    documentId: id,
    userId,
  });

  if (!document) {
    return { error: "Document not found" };
  }

  return normalizeDocumentStructure(document);
};

export const saveDocumentAndRelatedEntities = async (
  input: SaveDocumentDetailsData,
) => {
  const { document, sections, fields } = input;

  await db.transaction(async (trx) => {
    const documentInsertPromise = document
      ? upsertDocument(trx, document)
      : undefined;
    const sectionInserts = sections ? upsertSections(trx, sections) : undefined;
    const fieldInserts = fields ? upsertSectionFields(trx, fields) : undefined;

    await Promise.all([documentInsertPromise, sectionInserts, fieldInserts]);
  });
};

export const addFieldsWithValues = async (
  fields: DocumentSectionFieldInsertModel[],
) => {
  return await db.transaction(async (trx) => {
    const fieldInsertIds = await trx
      .insert(fieldSchema)
      .values(fields)
      .$returningId();

    return {
      fieldInsertIds: fieldInsertIds.map((item) => item.id),
    };
  });
};

export const removeFields = async (fieldIds: DocumentSectionField["id"][]) => {
  return bulkDeleteFields(fieldIds);
};

export const addSectionByInternalTag = async (
  data: DocumentSectionInsertModel,
) => {
  return db.transaction(async (trx) => {
    const [{ insertId: sectionId }] = await trx
      .insert(sectionSchema)
      .values(data);

    const fieldsTemplate = getFieldInsertTemplateBySectionTag(
      sectionId,
      data.internalSectionTag as INTERNAL_SECTION_TAG,
    );

    const fieldIds = await insertFields(trx, sectionId, fieldsTemplate);

    const section = {
      ...data,
      id: sectionId,
    };

    const fields = fieldsTemplate.map((field, index) => ({
      ...field,
      id: fieldIds[index] as DocumentSectionField["id"],
    }));

    return {
      section,
      fields,
    };
  });
};

export const deleteSection = async (sectionId: DocumentSection["id"]) => {
  return db.delete(sectionSchema).where(eq(sectionSchema.id, sectionId));
};
