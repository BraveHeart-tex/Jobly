import PageContainer from "@/components/common/PageContainer";
import MyDocumentsTabs from "@/features/candidate/documents/components/UploadedDocumentsPage";

const MyDocumentsPage = () => {
  return (
    <main>
      <PageContainer>
        <MyDocumentsTabs />
      </PageContainer>
    </main>
  );
};

export default MyDocumentsPage;
