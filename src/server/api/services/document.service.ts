"use server";

import type { DocumentBuilderConfig, MakeFieldsRequired } from "@/lib/types";
import { db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  type User,
  document as documentSchema,
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
    document: result,
    sections: result.sections,
    fields: result.sections.flatMap((section) => section.fields),
    fieldValues: result.sections.flatMap((section) =>
      section.fields.flatMap((field) => field.fieldValues),
    ),
  };
};
