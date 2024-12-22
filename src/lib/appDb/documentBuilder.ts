import appDb from "@/lib/appDb";

export const getDocumentSections = async (documentId: number) => {
  return await appDb.documentSections
    .where("documentId")
    .equals(documentId)
    .toArray();
};
