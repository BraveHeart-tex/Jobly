import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import AccountSettingsTabs from "@/features/user/accountSettings/AccountSettingsTabs";
import { cachedValidateRequest } from "@/lib/auth/validateRequest";
import { SHARED_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

const AccountSettingsPage = async () => {
  const { user } = await cachedValidateRequest();
  if (!user) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  return (
    <main>
      <PageContainer>
        <PageTitle className="mb-4">Account Settings</PageTitle>
        <AccountSettingsTabs />
      </PageContainer>
    </main>
  );
};

export default AccountSettingsPage;
