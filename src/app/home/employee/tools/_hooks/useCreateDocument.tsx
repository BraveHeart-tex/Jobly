"use client";

import type { DocumentType } from "@/server/db/schema";
import { api } from "@/trpc/react";

export const useCreateDocument = () => {
  const { mutateAsync: createDocument, isPending } =
    api.document.createDocument.useMutation();

  const handleCreateDocument = async (documentType: DocumentType) => {
    return await createDocument({
      title: "Untitled",
      language: "EN",
      type: documentType,
      allowedRoles: ["employee"],
    });
  };

  return {
    createDocument: handleCreateDocument,
    isCreatingDocument: isPending,
  };
};
