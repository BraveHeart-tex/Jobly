"use server";

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
  type SectionFieldValueInsertModel,
  type SectionInsertModel,
  document as documentSchema,
  field as fieldSchema,
  fieldValue as fieldValueSchema,
  section as sectionSchema,
} from "@/server/db/schema";
import { and, desc, eq } from "drizzle-orm";
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

const insertFieldValues = async (
  trx: Trx,
  fieldId: SectionField["id"],
  fieldValues: Omit<SectionFieldValueInsertModel, "fieldId">[],
) => {
  await Promise.all(
    fieldValues.map((fieldValue) =>
      trx.insert(fieldValueSchema).values({
        ...fieldValue,
        fieldId,
      }),
    ),
  );
};

export const insertPredefinedSectionsAndFields = async ({
  user,
  documentId,
}: { user: User; documentId: Document["id"] }) => {
  const sections: SectionInsertModel[] = [
    {
      documentId,
      name: "Personal Details",
      displayOrder: 1,
    },
    {
      documentId,
      name: "Professional Summary",
      displayOrder: 2,
    },
    {
      documentId,
      name: "Employment History",
      displayOrder: 3,
      fieldsContainerType: "collapsible",
    },
    {
      documentId,
      name: "Websites & Social Links",
      displayOrder: 4,
      fieldsContainerType: "collapsible",
    },
  ];

  const sectionFields = [
    {
      sectionKey: "Personal Details",
      fieldName: "Wanted Job Title",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "First Name",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Last Name",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Email",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Phone",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Country",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "City",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Address",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Postal Code",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Driving License",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Nationality",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Place of Birth",
      fieldType: "text",
    },
    {
      sectionKey: "Personal Details",
      fieldName: "Date of Birth",
      fieldType: "date",
    },
    {
      sectionKey: "Professional Summary",
      fieldName: "Professional Summary",
      fieldType: "richText",
    },
    {
      sectionKey: "Employment History",
      fieldName: "Job Title",
      fieldType: "string",
    },
    {
      sectionKey: "Employment History",
      fieldName: "Start Date",
      fieldType: "date",
    },
    {
      sectionKey: "Employment History",
      fieldName: "End Date",
      fieldType: "date",
    },
    {
      sectionKey: "Employment History",
      fieldName: "Employer",
      fieldType: "string",
    },
    {
      sectionKey: "Employment History",
      fieldName: "Description",
      fieldType: "richText",
    },
    {
      sectionKey: "Employment History",
      fieldName: "Description",
      fieldType: "richText",
    },
  ];

  const generateSectionFieldValues = () => {
    const defaultSectionFieldValues = [
      {
        fieldKey: "First Name",
        value: user.firstName,
      },
      {
        fieldKey: "Last Name",
        value: user.lastName,
      },
      {
        fieldKey: "Email",
        value: user.email,
      },
    ];
    return sectionFields.map((sectionField) => ({
      fieldKey: sectionField.fieldName,
      value:
        defaultSectionFieldValues.find(
          (value) => value.fieldKey === sectionField.fieldName,
        )?.value || "",
    }));
  };

  const sectionFieldValues = generateSectionFieldValues();

  await db.transaction(async (trx) => {
    const sectionIds = await insertSections(trx, sections);

    for (let i = 0; i < sectionIds.length; i++) {
      const section = sections[i];
      const sectionId = sectionIds[i] as number;

      const selectedSectionFields = sectionFields.filter(
        (field) => field.sectionKey === section?.name,
      );

      const fieldIds = await insertFields(
        trx,
        sectionId,
        selectedSectionFields,
      );

      for (let j = 0; j < selectedSectionFields.length; j++) {
        const field = selectedSectionFields[j];
        const fieldId = fieldIds[j] as number;

        const selectedSectionFieldValues = sectionFieldValues.filter(
          (fieldValue) => fieldValue.fieldKey === field?.fieldName,
        );

        await insertFieldValues(trx, fieldId, selectedSectionFieldValues);
      }
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
    fields: result.sections.flatMap((section) => section.fields),
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
