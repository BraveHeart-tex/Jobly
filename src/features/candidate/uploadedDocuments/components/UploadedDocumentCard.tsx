"use client";
import { showErrorToast } from "@/components/toastUtils";
import DocumentListItemBase from "@/features/candidate/documents/components/DocumentListItemBase";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";

interface UploadedDocumentCardProps {
  document: DocumentSelectModel;
}

const UploadedDocumentCard = ({ document }: UploadedDocumentCardProps) => {
  const handleViewFile = () => {
    if (!document.url) {
      showErrorToast("Document URL is not available.");
      return;
    }
    window.open(document.url, "_blank");
  };

  const handleDelete = () => {};

  return (
    <DocumentListItemBase
      item={document}
      functionKey="getUploadedUserDocuments"
      onTitleClick={handleViewFile}
      actions={[
        {
          label: "View Document",
          onClick: handleViewFile,
          icon: <SquareArrowOutUpRight size={18} />,
        },
        {
          label: "Delete",
          onClick: handleDelete,
          variant: "destructive" as const,
          icon: <Trash2 size={18} />,
        },
      ]}
    />
  );
};
export default UploadedDocumentCard;
