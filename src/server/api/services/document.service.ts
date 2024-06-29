"use server";

import type { DocumentBuilderConfig, MakeFieldsRequired } from "@/lib/types";
import { db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  type User,
  document as documentSchema,
  section,
  field,
  fieldValue,
  type SectionField,
} from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

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

// TODO: Oh god, this is ugly and needs refactoring
export const getDocumentById = async (
  id: Document["id"],
): Promise<DocumentBuilderConfig | { error: string }> => {
  const document = await db.query.document.findFirst({
    where: eq(documentSchema.id, id),
  });

  if (!document) {
    return {
      error: "Document not found",
    };
  }

  const sections = await db.query.section.findMany({
    where: eq(section.documentId, document.id),
  });

  const fields: SectionField[] = [];

  for (const section of sections) {
    const sectionFields = await db.query.field.findMany({
      where: eq(field.sectionId, section.id),
    });

    fields.push(...sectionFields);
  }

  const fieldValues = [];

  for (const field of fields) {
    const fieldValueItem = await db.query.fieldValue.findMany({
      where: eq(fieldValue.fieldId, field.id),
    });

    fieldValues.push(...fieldValueItem);
  }

  return {
    document,
    fields,
    fieldValues,
    sections,
  };
};
