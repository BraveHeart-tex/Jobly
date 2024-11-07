import type { DocumentInsertModel } from "@/server/db/schema/documents";

export interface UploadedDocumentInsertModel extends DocumentInsertModel {
  file: File;
  fileExtension: string;
}
