import { showErrorToast } from "@/components/toastUtils";
import { api } from "@/trpc/react";

export const useUpdateDocument = () => {
  const queryClientUtils = api.useUtils();

  const { mutate: updateDocument, isPending } =
    api.document.updateDocument.useMutation({
      onMutate: async (variables) => {
        await queryClientUtils.document.getUserDocumentBuilderDocuments.cancel();

        const previousUserDocuments =
          queryClientUtils.document.getUserDocumentBuilderDocuments.getData();

        queryClientUtils.document.getUserDocumentBuilderDocuments.setData(
          undefined,
          (oldUserDocuments) => {
            if (!oldUserDocuments) return oldUserDocuments;
            return oldUserDocuments.map((document) => {
              if (document.id === variables.id) {
                return {
                  ...document,
                  ...variables,
                  updatedAt: new Date().toISOString(),
                };
              }
              return document;
            });
          },
        );

        return { previousUserDocuments };
      },
      onError: (_err, _newJob, context) => {
        showErrorToast("Something went wrong, please try again later");
        queryClientUtils.document.getUserDocumentBuilderDocuments.setData(
          undefined,
          context?.previousUserDocuments,
        );
      },
      onSettled: () => {
        void queryClientUtils.document.getUserDocumentBuilderDocuments.invalidate();
      },
    });

  return {
    updateDocument,
    isUpdating: isPending,
  };
};
