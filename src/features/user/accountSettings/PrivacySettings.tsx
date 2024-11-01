import { Switch } from "@/components/ui/switch";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import DeleteAccountButton from "@/features/user/accountSettings/DeleteAccountButton";
import SettingBlock from "@/features/user/accountSettings/SettingBlock";
import SettingSectionTitle from "@/features/user/accountSettings/SettingSectionTitle";

const PrivacySettings = () => {
  return (
    <AccountSettingContentCard
      title="Privacy Settings"
      description="Control your profile visibility and search preferences"
    >
      <div className="space-y-4">
        <SettingBlock
          title="Profile Visibility"
          description="Make your profile visible to employers"
          renderSettingControl={() => <Switch />}
        />
        <SettingBlock
          title="Searchable Profile"
          description="Allow employers to find you in search results"
          renderSettingControl={() => <Switch />}
        />

        <div className="space-y-2">
          <SettingSectionTitle>Danger Zone</SettingSectionTitle>
          <hr />
        </div>
        <DeleteAccountButton />
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. This will permanently delete your
          account and all of your data from our servers.
        </p>
      </div>
    </AccountSettingContentCard>
  );
};
export default PrivacySettings;
