"use client";
import { Switch } from "@/components/ui/switch";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import SettingBlock from "@/features/user/accountSettings/SettingBlock";
import SettingSectionTitle from "@/features/user/accountSettings/SettingSectionTitle";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";

const NotificationSettings = () => {
  const userEmail = useCurrentUserStore((state) => state.user?.email);
  return (
    <AccountSettingContentCard
      title="Notification Preferences"
      description="Choose what notifications you want to receive"
    >
      <div className="space-y-2">
        <SettingSectionTitle>General Notifications</SettingSectionTitle>
        <hr />
        <div className="space-y-4">
          <SettingBlock
            title="Job Recommendations"
            description="Receive notifications about relevant job opportunities"
            renderSettingControl={() => <Switch />}
          />
          <SettingBlock
            title="Interview Reminders"
            description="Get notified about upcoming interviews"
            renderSettingControl={() => <Switch />}
          />
          <SettingBlock
            title="Application Status"
            description="Updates about your job applications"
            renderSettingControl={() => <Switch />}
          />
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <SettingSectionTitle className="flex items-center gap-2">
          Email Notifications
          {userEmail && (
            <p className="text-sm text-muted-foreground">({userEmail})</p>
          )}
        </SettingSectionTitle>
        <hr />
        <div className="space-y-4">
          <SettingBlock
            title="Job postings that match your job alert settings"
            renderSettingControl={() => <Switch />}
          />
          <SettingBlock
            title="Job postings that match your skills and preferences"
            renderSettingControl={() => <Switch />}
          />
          <SettingBlock
            title="Closing dates on bookmarked jobs"
            renderSettingControl={() => <Switch />}
          />
        </div>
      </div>
    </AccountSettingContentCard>
  );
};
export default NotificationSettings;
