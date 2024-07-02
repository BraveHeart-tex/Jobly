"use server";

import type { DocumentBuilderConfig, MakeFieldsRequired } from "@/lib/types";
import { exclude } from "@/lib/utils";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  document as documentSchema,
  section as sectionSchema,
  field as fieldSchema,
  fieldValue as fieldValueSchema,
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

export const insertPredefinedSectionsAndFields = async ({
  user,
  documentId,
}: { user: User; documentId: Document["id"] }) => {
  const sections = [
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
  ];

  const sectionFieldValues = [
    {
      fieldKey: "Wanted Job Title",
      value: "",
    },
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
    {
      fieldKey: "Phone",
      value: "",
    },
    {
      fieldKey: "Country",
      value: "",
    },
    {
      fieldKey: "City",
      value: "",
    },
    {
      fieldKey: "Address",
      value: "",
    },
    {
      fieldKey: "Postal Code",
      value: "",
    },
    {
      fieldKey: "Driving License",
      value: "",
    },
    {
      fieldKey: "Nationality",
      value: "",
    },
    {
      fieldKey: "Place of Birth",
      value: "",
    },
    {
      fieldKey: "Date of Birth",
      value: "",
    },
    {
      fieldKey: "Professional Summary",
      value: "",
    },
  ];

  await db.transaction(async (trx) => {
    for (const section of sections) {
      const [result] = await trx.insert(sectionSchema).values(section);
      const sectionId = result.insertId;
      const selectedSectionFields = sectionFields.filter(
        (field) => field.sectionKey === section.name,
      );
      for (const field of selectedSectionFields) {
        const [result] = await trx.insert(fieldSchema).values({
          fieldName: field.fieldName,
          fieldType: field.fieldName,
          sectionId,
        });
        const fieldId = result.insertId;
        const selectedSectionFieldValues = sectionFieldValues.filter(
          (fieldValue) => fieldValue.fieldKey === field.fieldName,
        );
        for (const fieldValue of selectedSectionFieldValues) {
          await trx.insert(fieldValueSchema).values({
            ...fieldValue,
            fieldId,
          });
        }
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
    sections: result.sections,
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
