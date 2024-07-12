"use server";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import type {
  DocumentBuilderConfig,
  MakeFieldsRequired,
  Trx,
} from "@/lib/types";
import { exclude } from "@/lib/utils";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { db } from "@/server/db";
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
  const results = await Promise.all(
    sections.map((section) => trx.insert(sectionSchema).values(section)),
  );

  return results.map((result) => result[0].insertId);
};

const insertFields = async (
  trx: Trx,
  sectionId: Section["id"],
  fields: Omit<SectionFieldInsertModel, "sectionId">[],
) => {
  const results = await Promise.all(
    fields.map((field) =>
      trx.insert(fieldSchema).values({
        ...field,
        sectionId,
      }),
    ),
  );

  return results.map((result) => result[0].insertId);
};

const insertFieldValues = async (trx: Trx, fieldIds: SectionField["id"][]) => {
  const results = await Promise.all(
    fieldIds.map((fieldId) =>
      trx.insert(fieldValueSchema).values({
        fieldId,
        value: "",
      }),
    ),
  );

  return results.map((result) => result[0].insertId);
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
  input: SaveDocumentDetailsSchema & { userId: User["id"] },
) => {
  const { document, sections, fields, fieldValues, userId } = input;

  if (document.userId !== userId) {
    return {
      error: "You do not have access to edit this document.",
    };
  }

  await db.transaction(async (trx) => {
    await trx.insert(documentSchema).values(document).onDuplicateKeyUpdate({
      set: document,
    });

    const sectionInserts = sections.map((sectionData) =>
      trx
        .insert(sectionSchema)
        .values(sectionData)
        .onDuplicateKeyUpdate({ set: sectionData }),
    );

    const fieldInserts = fields.map((fieldData) =>
      trx.insert(fieldSchema).values(fieldData).onDuplicateKeyUpdate({
        set: fieldData,
      }),
    );

    const fieldValueInserts = fieldValues.map((fieldValueData) =>
      trx
        .insert(fieldValueSchema)
        .values(fieldValueData)
        .onDuplicateKeyUpdate({ set: fieldValueData }),
    );

    await Promise.all([
      ...sectionInserts,
      ...fieldInserts,
      ...fieldValueInserts,
    ]);
  });
};

export const addFieldsWithValues = async (
  fields: SectionFieldInsertModel[],
) => {
  const fieldInsertIds = await db.transaction(async (trx) => {
    const results = await Promise.all(
      fields.map((field) => trx.insert(fieldSchema).values(field)),
    );
    return results.map((result) => result[0].insertId);
  });

  const fieldValueInsertIds = await db.transaction(async (trx) => {
    const results = await Promise.all(
      fieldInsertIds.map((fieldId) =>
        trx.insert(fieldValueSchema).values({
          fieldId,
          value: "",
        }),
      ),
    );

    return results.map((result) => result[0].insertId);
  });

  return {
    fieldIds: fieldInsertIds,
    fieldValueIds: fieldValueInsertIds,
  };
};

export const removeFields = async (fieldIds: SectionField["id"][]) => {
  return Promise.all([
    db.delete(fieldSchema).where(inArray(fieldSchema.id, fieldIds)),
    db
      .delete(fieldValueSchema)
      .where(inArray(fieldValueSchema.fieldId, fieldIds)),
  ]);
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
