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
  upsertDocument,
  upsertSectionFieldValues,
  upsertSectionFields,
  upsertSections,
} from "@/server/api/repositories/document.repository";
import { db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  type Section,
  type SectionField,
  type SectionFieldInsertModel,
  type SectionFieldValue,
  type SectionInsertModel,
  documents as documentSchema,
  documentSectionFields as fieldSchema,
  documentSectionFieldValues as fieldValueSchema,
  documentSections as sectionSchema,
} from "@/server/db/schema";
import {
  getFieldInsertTemplate,
  getPredefinedDocumentSections,
  normalizeDocumentStructure,
} from "@/server/utils/document.service.utils";
import { eq } from "drizzle-orm";
import type { User } from "lucia";

export const getUserDocuments = async (userId: User["id"]) => {
  return getDocumentsByUserId(userId);
};

export const deleteDocument = async (documentId: Document["id"]) => {
  return deleteDocumentById(documentId);
};

export const updateDocument = async (
  input: MakeFieldsRequired<Partial<Document>, "id">,
) => {
  return db
    .update(documentSchema)
    .set(input)
    .where(eq(documentSchema.id, input.id));
};

export const createDocument = async (
  input: DocumentInsertModel,
  user: User,
) => {
  const [response] = await db.insert(documentSchema).values(input);
  await insertPredefinedSectionsAndFields({
    user,
    documentId: response.insertId,
  });
  return response.insertId;
};

const insertSections = async (trx: Trx, sections: SectionInsertModel[]) => {
  const result = await trx
    .insert(sectionSchema)
    .values(sections.map((section) => section))
    .$returningId();

  return result.map((item) => item.id);
};

const insertFields = async (
  trx: Trx,
  sectionId: Section["id"],
  fields: Omit<SectionFieldInsertModel, "sectionId">[],
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

const insertFieldValues = async (trx: Trx, fieldIds: SectionField["id"][]) => {
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

export const insertPredefinedSectionsAndFields = async ({
  user,
  documentId,
}: { user: User; documentId: Document["id"] }) => {
  const sections = getPredefinedDocumentSections(documentId);
  const DEFAULT_FIELDS: Record<string, string> = {
    "First Name": user.firstName,
    "Last Name": user.lastName,
    Email: user.email,
  };

  await db.transaction(async (trx) => {
    const sectionIds = await insertSections(trx, sections);
    const fieldInsertDTOs: SectionFieldInsertModel[] = [];

    for (const [index, sectionId] of sectionIds.entries()) {
      const section = sections[index];
      if (section) {
        const sectionFields = getFieldInsertTemplate(
          sectionId,
          section.internalSectionTag,
        );

        fieldInsertDTOs.push(...sectionFields);
      }
    }

    const fieldIds = (
      await trx.insert(fieldSchema).values(fieldInsertDTOs).$returningId()
    ).map((item) => item.id);

    const sectionFields = fieldInsertDTOs.map((field, index) => ({
      ...field,
      id: fieldIds[index] as SectionField["id"],
      defaultValue: DEFAULT_FIELDS[field.fieldName] ?? "",
    }));

    await trx.insert(fieldValueSchema).values(
      sectionFields.map((field) => ({
        fieldId: field.id,
        value: field.defaultValue ?? "",
      })),
    );
  });
};

export const getDocumentDetails = async ({
  id,
  userId,
}: {
  id: Document["id"];
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
  fields: SectionFieldInsertModel[],
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

export const removeFields = async (fieldIds: SectionField["id"][]) => {
  return bulkDeleteFields(fieldIds);
};

export const addSectionByInternalTag = async (data: SectionInsertModel) => {
  return db.transaction(async (trx) => {
    const [{ insertId: sectionId }] = await trx
      .insert(sectionSchema)
      .values(data);

    const fieldsTemplate = getFieldInsertTemplate(
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
      id: fieldIds[index] as SectionField["id"],
    }));

    const fieldValues = fieldValueIds.map((fieldValueId, index) => ({
      id: fieldValueId as SectionFieldValue["id"],
      fieldId: fieldIds[index] as SectionFieldValue["fieldId"],
      value: "",
    }));

    return {
      section,
      fields,
      fieldValues,
    };
  });
};

export const deleteSection = async (sectionId: Section["id"]) => {
  return db.delete(sectionSchema).where(eq(sectionSchema.id, sectionId));
};
