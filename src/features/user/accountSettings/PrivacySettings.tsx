import { Switch } from "@/components/ui/switch";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import DeleteAccountButton from "@/features/user/accountSettings/DeleteAccountButton";
import { useUpsertPrivacySettings } from "@/features/user/accountSettings/hooks/useUpsertPrivacySettings";
import SettingBlock from "@/features/user/accountSettings/SettingBlock";
import SettingSectionTitle from "@/features/user/accountSettings/SettingSectionTitle";
import type { Nullable } from "@/lib/types";
import type { PrivacySettingsData } from "@/schemas/user/settings/privacySettingsValidator";

interface PrivacySettingsProps {
  privacySettings: Nullable<PrivacySettingsData>;
}

const PrivacySettings = ({ privacySettings }: PrivacySettingsProps) => {
  const { upsertPrivacySettings } = useUpsertPrivacySettings();
  const handleToggleSearchableProfile = (checked: boolean) => {
    upsertPrivacySettings({
      searchableProfile: checked,
    });
  };
  return (
    <AccountSettingContentCard
      title="Privacy Settings"
      description="Control your profile visibility and search preferences"
    >
      <div className="space-y-4">
        <SettingBlock
          title="Searchable Profile"
          description="Allow employers to find you in search results"
          renderSettingControl={() => (
            <Switch
              checked={privacySettings?.searchableProfile}
              onCheckedChange={handleToggleSearchableProfile}
            />
          )}
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
