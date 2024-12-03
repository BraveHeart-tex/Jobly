import EmptyListCallToAction from "@/components/common/EmptyListCallToAction";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import UploadDocumentDialog from "@/features/candidate/documents/components/UploadDocumentDialog";

import UploadedDocumentList from "@/features/candidate/uploadedDocuments/components/UploadedDocumentList";
import { api } from "@/trpc/server";

const MyDocumentsPage = async () => {
  const uploadedDocuments = await api.document.getUploadedUserDocuments();

  return (
    <main>
      <PageContainer className="space-y-4">
        <div className="flex items-center justify-between">
          <PageTitle>Uploaded Documents</PageTitle>
          <UploadDocumentDialog />
        </div>
        <div className="h-[calc(100vh-12rem)]">
          {uploadedDocuments.length === 0 ? (
            <EmptyListCallToAction
              title="Start Your Journey: Upload Documents"
              description="Upload your documents to get started"
              illustrationPath="/document-list.svg"
              darkIllustrationPath="/document-list-dark.svg"
            />
          ) : (
            <UploadedDocumentList uploadedDocuments={uploadedDocuments} />
          )}
        </div>
      </PageContainer>
    </main>
  );
};

export default MyDocumentsPage;
