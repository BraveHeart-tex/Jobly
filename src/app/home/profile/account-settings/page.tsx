import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import AccountSettingsTabs from "@/features/user/accountSettings/AccountSettingsTabs";
import { getUserAccountSettings } from "@/features/user/accountSettings/data-access/accountSettings";
import { cachedValidateRequest } from "@/lib/auth/validateRequest";
import { SHARED_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

const AccountSettingsPage = async () => {
  const { user } = await cachedValidateRequest();

  if (!user) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  const accountSettings = await getUserAccountSettings(user.id, user.role);

  return (
    <main>
      <PageContainer>
        <PageTitle className="mb-4">Account Settings</PageTitle>
        <AccountSettingsTabs
          accountSettings={accountSettings}
          role={user.role}
        />
      </PageContainer>
    </main>
  );
};

export default AccountSettingsPage;
