"use server";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import type {
  DocumentBuilderConfig,
  MakeFieldsRequired,
  Trx,
} from "@/lib/types";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import {
  bulkDeleteFields,
  deleteDocumentById,
  getDocumentWithSectionsAndFields,
  getDocumentsByUserId,
  updateDocumentById,
  upsertDocument,
  upsertSectionFieldValues,
  upsertSectionFields,
  upsertSections,
} from "@/server/api/repositories/document.repository";
import { db } from "@/server/db";
import {
  documentSectionFields as fieldSchema,
  documentSectionFieldValues as fieldValueSchema,
  documentSections as sectionSchema,
} from "@/server/db/schema";
import type { DocumentSectionFieldValue } from "@/server/db/schema/documentSectionFieldValues";
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
import {
  getFieldInsertTemplateBySectionTag,
  getPredefinedDocumentSectionsWithDocumentId,
  makeFieldInsertDTOs,
  makeFieldValueInsertDTOs,
  normalizeDocumentStructure,
} from "@/server/utils/document.service.utils";
import { eq } from "drizzle-orm";
import type { User } from "lucia";

export const getUserDocuments = async (userId: User["id"]) => {
  return getDocumentsByUserId(userId);
};

export const deleteDocument = async (documentId: DocumentSelectModel["id"]) => {
  return deleteDocumentById(documentId);
};

export const updateDocument = async (
  input: MakeFieldsRequired<Partial<DocumentSelectModel>, "id">,
) => {
  return updateDocumentById(input);
};

export const createDocumentAndRelatedEntities = async (
  documentCreateInput: DocumentInsertModel,
  user: User,
) => {
  return await db.transaction(async (trx) => {
    const [documentInsertResponse] = await upsertDocument(
      trx,
      documentCreateInput,
    );
    if (!documentInsertResponse) {
      trx.rollback();
      return;
    }
    const documentId = documentInsertResponse.id;
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

    const DEFAULT_FIELDS: Record<string, string> = {
      "First Name": user.firstName,
      "Last Name": user.lastName,
      Email: user.email,
    };
    const fieldValueInsertDTOs = makeFieldValueInsertDTOs(
      fieldInsertDTOs.map((field, index) => ({
        ...field,
        id: fieldInsertIds[index] as DocumentSectionField["id"],
      })),
      DEFAULT_FIELDS,
    );
    await upsertSectionFieldValues(trx, fieldValueInsertDTOs);

    return documentId;
  });
};

const insertSections = async (
  trx: Trx,
  sections: DocumentSectionInsertModel[],
) => {
  const result = await trx
    .insert(sectionSchema)
    .values(sections.map((section) => section))
    .$returningId();

  return result.map((item) => item.id);
};

const insertFields = async (
  trx: Trx,
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

const insertFieldValues = async (
  trx: Trx,
  fieldIds: DocumentSectionField["id"][],
) => {
  const result = await trx
    .insert(fieldValueSchema)
    .values(
      fieldIds.map((fieldId) => ({
        fieldId,
        value: "",
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
  input: Partial<SaveDocumentDetailsSchema> & { userId: User["id"] },
) => {
  const { document, sections, fields, fieldValues } = input;
  await db.transaction(async (trx) => {
    if (document) {
      await upsertDocument(trx, document);
    }
    const sectionInserts = sections ? upsertSections(trx, sections) : undefined;
    const fieldInserts = fields ? upsertSectionFields(trx, fields) : undefined;
    const fieldValueInserts = fieldValues
      ? upsertSectionFieldValues(trx, fieldValues)
      : undefined;
    await Promise.all([sectionInserts, fieldInserts, fieldValueInserts]);
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
    const fieldValueInsertIds = await trx
      .insert(fieldValueSchema)
      .values(
        fieldInsertIds.map((item) => ({
          fieldId: item.id,
          value: "",
        })),
      )
      .$returningId();

    return {
      fieldInsertIds: fieldInsertIds.map((item) => item.id),
      fieldValueInsertIds: fieldValueInsertIds.map((item) => item.id),
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
    const fieldValueIds = await insertFieldValues(trx, fieldIds);

    const section = {
      ...data,
      id: sectionId,
    };

    const fields = fieldsTemplate.map((field, index) => ({
      ...field,
      id: fieldIds[index] as DocumentSectionField["id"],
    }));

    const fieldValues = fieldValueIds.map((fieldValueId, index) => ({
      id: fieldValueId as DocumentSectionFieldValue["id"],
      fieldId: fieldIds[index] as DocumentSectionFieldValue["fieldId"],
      value: "",
    }));

    return {
      section,
      fields,
      fieldValues,
    };
  });
};

export const deleteSection = async (sectionId: DocumentSection["id"]) => {
  return db.delete(sectionSchema).where(eq(sectionSchema.id, sectionId));
};
