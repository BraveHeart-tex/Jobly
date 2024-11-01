import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import AvatarSettings from "@/features/user/accountSettings/AvatarSettings";
import PersonalSettingsForm from "@/features/user/accountSettings/forms/PersonalSettingsForm";

const PersonalAccountSettings = () => {
  return (
    <AccountSettingContentCard
      title="Personal Information"
      description="Update your personal details and profile information"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 gap-4">
        <div className="lg:self-start mx-auto lg:mx-0">
          <AvatarSettings />
        </div>
        <div className="flex-1 lg:max-w-2xl">
          <PersonalSettingsForm />
        </div>
      </div>
    </AccountSettingContentCard>
  );
};
export default PersonalAccountSettings;
