import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import UploadDocumentDialog from "@/features/candidate/documents/components/UploadDocumentDialog";
import { api } from "@/trpc/server";
import Image from "next/image";

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
            <div className="flex items-center justify-center flex-col h-full w-full">
              <Image
                src={"/document-not-found.svg"}
                width={300}
                height={300}
                className="dark:invert"
                alt="Uploaded Documents"
              />
              <p className="text-muted-foreground">
                You haven't uploaded any documents yet
              </p>
            </div>
          ) : (
            <div>
              {uploadedDocuments.map((document) => (
                <div key={document.id}>
                  <div className="text-lg font-bold">{document.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </main>
  );
};

export default MyDocumentsPage;
