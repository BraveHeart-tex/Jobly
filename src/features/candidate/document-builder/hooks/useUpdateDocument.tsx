import { api } from "@/trpc/react";
import { toast } from "sonner";

export const useUpdateDocument = () => {
  const queryClientUtils = api.useUtils();

  const { mutate: updateDocument, isPending } =
    api.document.updateDocument.useMutation({
      onMutate: async (variables) => {
        await queryClientUtils.document.getUserDocuments.cancel();

        const previousUserDocuments =
          queryClientUtils.document.getUserDocuments.getData();

        queryClientUtils.document.getUserDocuments.setData(
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
        toast.error("Something went wrong, please try again later");
        queryClientUtils.document.getUserDocuments.setData(
          undefined,
          context?.previousUserDocuments,
        );
      },
      onSettled: () => {
        void queryClientUtils.document.getUserDocuments.invalidate();
      },
    });

  return {
    updateDocument,
    isUpdating: isPending,
  };
};
