import UploadedDocumentCard from "@/features/candidate/uploadedDocuments/components/UploadedDocumentCard";
import type { DocumentSelectModel } from "@/server/db/schema/documents";

interface UploadedDocumentListProps {
  uploadedDocuments: DocumentSelectModel[];
}
const UploadedDocumentList = ({
  uploadedDocuments,
}: UploadedDocumentListProps) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2">
      {uploadedDocuments.map((document) => (
        <UploadedDocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
};

export default UploadedDocumentList;
