"use client";
import DocumentListItemBase from "@/features/candidate/documents/components/DocumentListItemBase";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import {
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/toastUtils";
import LondonTemplate from "@/features/candidate/document-builder/components/LondonTemplate";
import { preparePdfData } from "@/features/candidate/document-builder/components/utils";
import { useDeleteDocument } from "@/features/candidate/document-builder/hooks/useDeleteDocument";
import { isErrorObject } from "@/lib/guards";
import { CANDIDATE_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/react";
import { FileDown, FilePen, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const DocumentListItem = ({ item }: { item: DocumentSelectModel }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { handleDeleteDocument, isDeletingDocument } = useDeleteDocument();
  const router = useRouter();
  const utils = api.useUtils();

  const goToEditPage = () => {
    const basePath = `${CANDIDATE_ROUTES.DOCUMENT_BUILDER}/${item.type === "resume" ? "cv-builder" : "cover-letters"}/edit`;
    router.push(`${basePath}/${item.id}`);
  };

  const handleDownloadPDF = async () => {
    const loadingToastId = showLoadingToast("Downloading PDF...");
    try {
      if (item.type === "cover_letter") {
        return showInfoToast(
          "You can download only resumes as PDF at the moment.",
          {
            id: loadingToastId,
          },
        );
      }

      setIsDownloading(true);

      const documentDataResponse =
        await utils.document.getDocumentDetails.fetch({
          id: item.id,
          source: item.source,
        });

      if (isErrorObject(documentDataResponse)) {
        showErrorToast(documentDataResponse.error, {
          id: loadingToastId,
        });
        return;
      }

      const pdf = (await import("@react-pdf/renderer")).pdf;

      const blob = await pdf(
        <LondonTemplate data={preparePdfData(documentDataResponse)} />,
      ).toBlob();

      showSuccessToast("PDF downloaded successfully.", {
        id: loadingToastId,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title}.pdf`;
      link.click();

      URL.revokeObjectURL(url);

      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      showErrorToast("Something went wrong, please try again later.", {
        id: loadingToastId,
      });
      setIsDownloading(false);
    }
  };

  const documentActions = [
    {
      label: !isDownloading ? "Download PDF" : "Downloading PDF...",
      icon: !isDownloading ? (
        <FileDown size={18} />
      ) : (
        <Loader2 size={18} className="animate-spin" />
      ),
      onClick: handleDownloadPDF,
      disabled: isDownloading,
    },
    {
      label: "Edit Document",
      icon: <FilePen size={18} />,
      onClick: goToEditPage,
    },
    {
      label: "Delete Document",
      variant: "destructive" as const,
      icon: <Trash2 size={18} />,
      onClick: () => {
        handleDeleteDocument(item.id);
      },
      disabled: isDeletingDocument,
    },
  ];

  return (
    <DocumentListItemBase
      functionKey="getUserDocumentBuilderDocuments"
      item={item}
      actions={documentActions}
      onTitleClick={goToEditPage}
    />
  );
};
export default DocumentListItem;
