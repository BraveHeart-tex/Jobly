import { api } from "@/trpc/react";

export const useCreateUploadedDocument = (options?: {
  onSuccess?: () => void;
}) => {
  const {
    mutate: createUploadedDocument,
    isPending: isCreatingUploadedDocument,
  } = api.document.createUploadedDocument.useMutation(options);

  return {
    createUploadedDocument,
    isCreatingUploadedDocument,
  };
};
