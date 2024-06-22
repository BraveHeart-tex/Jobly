"use client";

import { useConfirmStore } from "@/lib/stores/useConfirmStore";

export const useDeleteDocument = () => {
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const deleteDocument = (documentId: number) => {
    showConfirmDialog({
      title: "Are you sure you want to delete this document?",
      // TODO: Implement undo functionality later on
      message: "This action cannot be undone.",
      onConfirm: () => {
        console.log("Delete document", documentId);
      },
      primaryActionLabel: "Delete",
    });
  };

  return {
    deleteDocument,
  };
};
