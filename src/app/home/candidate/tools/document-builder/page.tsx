import { validateRequestByRole } from "@/lib/auth/actions";
import DocumentTabs from "../_components/DocumentTabs";

const DocumentsPage = async () => {
  await validateRequestByRole(["candidate"]);
  return (
    <main>
      <div className="mx-auto w-full max-w-screen-2xl mt-10 p-1">
        <DocumentTabs />
      </div>
    </main>
  );
};

export default DocumentsPage;
