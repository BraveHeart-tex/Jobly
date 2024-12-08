"use client";
import DocumentListItemBase from "@/features/candidate/documents/components/DocumentListItemBase";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { showInfoToast } from "@/components/toastUtils";
import { useDeleteDocument } from "@/features/candidate/document-builder/hooks/useDeleteDocument";
import { CANDIDATE_ROUTES } from "@/lib/routes";
import { FileDown, FilePen, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import { useDownloadDocumentAsPdf } from "@/features/candidate/documents/hooks/useDownloadDocumentAsPdf";

const DocumentListItem = ({ item }: { item: DocumentSelectModel }) => {
  const [_, startTransition] = useTransition();
  const { handleDeleteDocument, isDeletingDocument } = useDeleteDocument();
  const { downloadDocumentAsPdf, isDownloading } = useDownloadDocumentAsPdf();
  const router = useRouter();

  const goToEditPage = () => {
    startTransition(() => {
      const basePath = `${CANDIDATE_ROUTES.DOCUMENT_BUILDER}/${item.type === "resume" ? "cv-builder" : "cover-letters"}/edit`;
      router.push(`${basePath}/${item.id}`);
    });
  };

  const handleDownloadPDF = async () => {
    if (item.type === "cover_letter") {
      return showInfoToast(
        "You can download only resumes as PDF at the moment.",
      );
    }

    downloadDocumentAsPdf(item.id);
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
