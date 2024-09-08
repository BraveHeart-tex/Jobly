import { validateRequestByRole } from "@/lib/auth/actions";
import DocumentTabs from "@/features/candidate/documents/components/DocumentTabs";
import PageContainer from "@/components/common/PageContainer";

const DocumentsPage = async () => {
  await validateRequestByRole(["candidate"]);
  return (
    <main>
      <PageContainer>
        <DocumentTabs />
      </PageContainer>
    </main>
  );
};

export default DocumentsPage;
