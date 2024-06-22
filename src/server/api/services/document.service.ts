"use server";

import { db } from "@/server/db";
import { type User, document, type Document } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getUserDocuments = async (userId: User["id"]) => {
  return db.select().from(document).where(eq(document.userId, userId));
};

export const deleteDocument = async (documentId: Document["id"]) => {
  return db.delete(document).where(eq(document.id, documentId));
};