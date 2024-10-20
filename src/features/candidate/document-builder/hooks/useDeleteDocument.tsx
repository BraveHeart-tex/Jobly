"use client";

import { showErrorToast, showSuccessToast } from "@/components/toastUtils";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { api } from "@/trpc/react";

export const useDeleteDocument = () => {
  const queryClientUtils = api.useUtils();
  const { mutate: deleteDocument, isPending: isDeletingDocument } =
    api.document.deleteDocument.useMutation({
      onMutate: async ({ documentId }) => {
        await queryClientUtils.document.getUserDocuments.cancel();

        const previousUserDocuments =
          queryClientUtils.document.getUserDocuments.getData();

        queryClientUtils.document.getUserDocuments.setData(
          undefined,
          (oldUserDocuments) => {
            if (!oldUserDocuments) return oldUserDocuments;
            return oldUserDocuments.filter(
              (document) => document.id !== documentId,
            );
          },
        );

        showSuccessToast("Document deleted successfully");
        return { previousUserDocuments };
      },
      onError: (_err, _newJob, context) => {
        showErrorToast("Something went wrong, please try again later");
        queryClientUtils.document.getUserDocuments.setData(
          undefined,
          context?.previousUserDocuments,
        );
      },
      onSettled: () => {
        void queryClientUtils.document.getUserDocuments.invalidate();
      },
    });
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const handleDeleteDocument = (documentId: DocumentSelectModel["id"]) => {
    showConfirmDialog({
      title: "Are you sure you want to delete this document?",
      message: "This action cannot be undone.",
      onConfirm: async () => {
        deleteDocument({
          documentId,
        });
      },
      primaryActionLabel: "Delete",
    });
  };

  return {
    handleDeleteDocument,
    isDeletingDocument,
  };
};
