import { validateRequestByRole } from "@/lib/auth/actions";
import DocumentTabs from "../_components/DocumentTabs";
import PageContainer from "@/components/PageContainer";

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
