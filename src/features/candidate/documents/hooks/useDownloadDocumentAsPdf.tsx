import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/toastUtils";
import { downloadDocumentAsPdf } from "@/features/candidate/document-builder/actions";
import { isErrorObject } from "@/lib/guards";
import { useMutation } from "@tanstack/react-query";

export const useDownloadDocumentAsPdf = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: downloadDocumentAsPdf,
    onMutate() {
      const loadingToastId = showLoadingToast("Downloading PDF...");
      return {
        loadingToastId,
      };
    },
    onSuccess(data, _variables, context) {
      if (isErrorObject(data)) {
        showErrorToast(data.error, {
          id: context?.loadingToastId,
        });
        return;
      }

      showSuccessToast("PDF downloaded successfully.", {
        id: context?.loadingToastId,
      });

      const blob = data.blob;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.filename;
      link.click();
      URL.revokeObjectURL(url);
    },
    onError(error, _variables, context) {
      showErrorToast(error.message, {
        id: context?.loadingToastId,
      });
    },
  });

  return {
    downloadDocumentAsPdf: mutate,
    isDownloading: isPending,
  };
};
