import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import UploadDocumentDialog from "@/features/candidate/documents/components/UploadDocumentDialog";
import { api } from "@/trpc/server";

const MyDocumentsPage = async () => {
  const uploadedDocuments = await api.document.getUploadedUserDocuments();

  return (
    <main>
      <PageContainer>
        <div className="flex items-center justify-between">
          <PageTitle>Uploaded Documents</PageTitle>
          <UploadDocumentDialog />
        </div>
      </PageContainer>
    </main>
  );
};

export default MyDocumentsPage;
