"use server";

import type { DocumentBuilderConfig, MakeFieldsRequired } from "@/lib/types";
import { exclude } from "@/lib/utils";
import type { SaveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  type User,
  document as documentSchema,
  section as sectionSchema,
  field as fieldSchema,
  fieldValue as fieldValueSchema,
} from "@/server/db/schema";
import { and, desc, eq } from "drizzle-orm";

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

export const createDocument = async (input: DocumentInsertModel) => {
  const [response] = await db.insert(documentSchema).values(input);
  return response.insertId;
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
