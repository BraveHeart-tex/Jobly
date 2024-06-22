"use client";

import { useGenericConfirmStore } from "@/lib/stores/useGenericConfirmDialogStore";

export const useDeleteDocument = () => {
  const showConfirmDialog = useGenericConfirmStore(
    (state) => state.showConfirmDialog,
  );

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
