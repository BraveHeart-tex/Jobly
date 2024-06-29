"use server";

import type { MakeFieldsRequired } from "@/lib/types";
import { db } from "@/server/db";
import {
  type Document,
  type DocumentInsertModel,
  type User,
  document,
} from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const getUserDocuments = async (userId: User["id"]) => {
  return db
    .select()
    .from(document)
    .where(eq(document.userId, userId))
    .orderBy(desc(document.createdAt));
};

export const deleteDocument = async (documentId: Document["id"]) => {
  return db.delete(document).where(eq(document.id, documentId));
};

export const updateDocument = async (
  input: MakeFieldsRequired<Partial<Document>, "id">,
) => {
  return db.update(document).set(input).where(eq(document.id, input.id));
};

export const createDocument = async (input: DocumentInsertModel) => {
  const [response] = await db.insert(document).values(input);
  return response.insertId;
};

export const getDocumentById = async (id: Document["id"]) => {
  return db.query.document.findFirst({
    where: eq(document.id, id),
  });
};
