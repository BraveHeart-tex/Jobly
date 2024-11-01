import { Switch } from "@/components/ui/switch";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";

const NotificationSettings = () => {
  return (
    <AccountSettingContentCard
      title="Notification Preferences"
      description="Choose what notifications you want to receive"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Job Recommendations</h4>
            <p className="text-sm text-gray-500">
              Receive notifications about relevant job opportunities
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Interview Reminders</h4>
            <p className="text-sm text-gray-500">
              Get notified about upcoming interviews
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Application Status</h4>
            <p className="text-sm text-gray-500">
              Updates about your job applications
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </AccountSettingContentCard>
  );
};
export default NotificationSettings;
