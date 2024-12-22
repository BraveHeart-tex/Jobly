import appDb from "@/lib/appDb";

export const deleteLocalDocumentById = async (documentId: number) => {
  return await appDb.documents.delete(documentId);
};

appDb.documents.hook("deleting", async (documentId, _, transaction) => {
  transaction.on("complete", async () => {
    const sections = await appDb.documentSections
      .where("documentId")
      .equals(documentId)
      .toArray();

    const sectionIds = sections.map((section) => section.id);

    await appDb.documentSectionFields
      .where("sectionId")
      .anyOf(sectionIds)
      .delete();

    await appDb.documentSections
      .where("documentId")
      .equals(documentId)
      .delete();
  });
});
