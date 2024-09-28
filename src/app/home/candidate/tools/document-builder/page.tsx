import PageContainer from "@/components/common/PageContainer";
import { validateRequestByRole } from "@/features/auth/utils";
import DocumentTabs from "@/features/candidate/documents/components/DocumentTabs";

const DocumentsPage = async () => {
  await validateRequestByRole(["candidate"]);
  return (
    <main className="pt-10">
      <PageContainer>
        <DocumentTabs />
      </PageContainer>
    </main>
  );
};

export default DocumentsPage;
