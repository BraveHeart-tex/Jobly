"use client";

import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { api } from "@/trpc/react";

export const useDeleteDocument = () => {
  const { mutate: deleteDocument } = api.document.deleteDocument.useMutation();
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const handleDeleteDocument = (documentId: number) => {
    showConfirmDialog({
      title: "Are you sure you want to delete this document?",
      // TODO: Implement undo functionality later on
      message: "This action cannot be undone.",
      onConfirm: () => {
        deleteDocument({
          documentId,
        });
      },
      primaryActionLabel: "Delete",
    });
  };

  return {
    handleDeleteDocument,
  };
};
