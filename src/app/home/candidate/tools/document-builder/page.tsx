import PageContainer from "@/components/common/PageContainer";
import DocumentTabs from "@/features/candidate/documents/components/DocumentTabs";
import { validateRequestByRole } from "@/lib/auth/actions";

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
