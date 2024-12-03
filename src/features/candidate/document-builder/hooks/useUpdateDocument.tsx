import { showErrorToast } from "@/components/toastUtils";
import { api } from "@/trpc/react";

export type UpdateDocumentMutateFunctionKey =
  | "getUploadedUserDocuments"
  | "getUserDocumentBuilderDocuments";

export const useUpdateDocument = (
  functionKey: UpdateDocumentMutateFunctionKey,
) => {
  const queryClientUtils = api.useUtils();

  const { mutate: updateDocument, isPending } =
    api.document.updateDocument.useMutation({
      onMutate: async (variables) => {
        await queryClientUtils.document[functionKey].cancel();

        const previousUserDocuments =
          queryClientUtils.document[functionKey].getData();

        queryClientUtils.document[functionKey].setData(
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
        queryClientUtils.document[functionKey].setData(
          undefined,
          context?.previousUserDocuments,
        );
      },
      onSettled: () => {
        void queryClientUtils.document[functionKey].invalidate();
      },
    });

  return {
    updateDocument,
    isUpdating: isPending,
  };
};
