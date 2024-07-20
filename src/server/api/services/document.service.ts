"use server";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import type {
  DocumentBuilderConfig,
  MakeFieldsRequired,
  Trx,
} from "@/lib/types";
import { exclude } from "@/lib/utils";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { buildConflictUpdateColumns, db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  type Section,
  type SectionField,
  type SectionFieldInsertModel,
  type SectionFieldValue,
  type SectionFieldValueInsertModel,
  type SectionInsertModel,
  document as documentSchema,
  field as fieldSchema,
  fieldValue as fieldValueSchema,
  section as sectionSchema,
} from "@/server/db/schema";
import {
  getFieldInsertTemplate,
  getPredefinedDocumentSections,
} from "@/server/utils/document.service.utils";
import { and, desc, eq, inArray } from "drizzle-orm";
import type { User } from "lucia";

export const getUserDocuments = async (userId: User["id"]) => {
  return db
    .select()
    .from(documentSchema)
    .where(eq(documentSchema.userId, userId))
    .orderBy(desc(documentSchema.createdAt));
};

export const deleteDocument = async (documentId: Document["id"]) => {
  return db.delete(documentSchema).where(eq(documentSchema.id, documentId));
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

const insertFieldValue = async (
  trx: Trx,
  fieldValue: SectionFieldValueInsertModel,
) => {
  await trx.insert(fieldValueSchema).values(fieldValue);
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
    for (let i = 0; i < sectionIds.length; i++) {
      const section = sections[i];
      const sectionId = sectionIds[i] as number;
      const sectionFields = getFieldInsertTemplate(
        sectionId,
        section?.internalSectionTag as INTERNAL_SECTION_TAG,
      );
      const fieldIds = await insertFields(trx, sectionId, sectionFields);

      const fieldsWithDefaultValues = sectionFields.map((field, index) => ({
        ...field,
        id: fieldIds[index] as SectionField["id"],
        defaultValue: DEFAULT_FIELDS[field.fieldName] ?? "",
      }));

      await Promise.all(
        fieldsWithDefaultValues.map((field) =>
          insertFieldValue(trx, {
            fieldId: field.id,
            value: field.defaultValue,
          }),
        ),
      );
    }
  });
};

// TODO: Refactor this as well
export const getDocumentDetails = async ({
  id,
  userId,
}: {
  id: Document["id"];
  userId: User["id"];
}): Promise<DocumentBuilderConfig | { error: string }> => {
  const result = await db.query.document.findFirst({
    where: and(eq(documentSchema.id, id), eq(documentSchema.userId, userId)),
    with: {
      sections: {
        with: {
          fields: {
            with: {
              fieldValues: true,
            },
          },
        },
      },
    },
  });

  if (!result) {
    return { error: "Document not found" };
  }

  return {
    document: exclude(result, ["sections"]),
    sections: result.sections.map((section) => exclude(section, ["fields"])),
    fields: result.sections.flatMap((section) =>
      section.fields.map((field) => exclude(field, ["fieldValues"])),
    ),
    fieldValues: result.sections.flatMap((section) =>
      section.fields.flatMap((field) => field.fieldValues),
    ),
  };
};

export const saveDocumentDetails = async (
  input: Partial<SaveDocumentDetailsSchema> & { userId: User["id"] },
) => {
  const { document, sections, fields, fieldValues } = input;

  await db.transaction(async (trx) => {
    if (document) {
      await trx.insert(documentSchema).values(document).onDuplicateKeyUpdate({
        set: document,
      });
    }

    const sectionInserts = sections
      ? trx
          .insert(sectionSchema)
          .values(sections.map((sectionData) => sectionData))
          .onDuplicateKeyUpdate({
            set: buildConflictUpdateColumns(sectionSchema, [
              "id",
              "documentId",
            ]),
          })
      : undefined;

    const fieldInserts = fields
      ? trx
          .insert(fieldSchema)
          .values(fields.map((fieldData) => fieldData))
          .onDuplicateKeyUpdate({
            set: buildConflictUpdateColumns(fieldSchema, ["id", "sectionId"]),
          })
      : undefined;

    const fieldValueInserts = fieldValues
      ? trx
          .insert(fieldValueSchema)
          .values(fieldValues.map((fieldValue) => fieldValue))
          .onDuplicateKeyUpdate({
            set: buildConflictUpdateColumns(fieldValueSchema, [
              "fieldId",
              "id",
            ]),
          })
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
  return db.delete(fieldSchema).where(inArray(fieldSchema.id, fieldIds));
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
