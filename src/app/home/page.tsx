import PageContainer from "@/components/common/PageContainer";
import { validateRequestByRole } from "@/features/auth/utils";

const AppHomePage = async () => {
  await validateRequestByRole(["candidate", "employer"]);

  return (
    <main>
      <PageContainer>AppHomePage</PageContainer>
    </main>
  );
};

export default AppHomePage;
