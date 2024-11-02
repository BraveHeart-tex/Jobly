import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import SettingsSkeleton from "@/features/user/accountSettings/AccountSettingsSkeleton";

const AccountSettingsLoading = () => {
  return (
    <PageContainer>
      <PageTitle className="mb-4">Account Settings</PageTitle>
      <SettingsSkeleton />
    </PageContainer>
  );
};

export default AccountSettingsLoading;
