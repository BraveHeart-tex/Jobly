import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import type { UploadedDocumentInsertModel } from "@/features/candidate/uploadedDocuments/types";

export const createUploadedDocument = async (
  data: UploadedDocumentInsertModel,
) => {
  return await db.insert(documents).values(data);
};
