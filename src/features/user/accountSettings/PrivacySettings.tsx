import { Switch } from "@/components/ui/switch";
import SettingContentCard from "@/features/user/accountSettings/SettingContentCard";

const PrivacySettings = () => {
  return (
    <SettingContentCard
      title="Privacy Settings"
      description="Control your profile visibility and search preferences"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Profile Visibility</h4>
            <p className="text-sm text-gray-500">
              Make your profile visible to employers
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Searchable Profile</h4>
            <p className="text-sm text-gray-500">
              Allow employers to find you in search results
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Show Contact Details</h4>
            <p className="text-sm text-gray-500">
              Display your contact information to approved connections
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </SettingContentCard>
  );
};
export default PrivacySettings;
