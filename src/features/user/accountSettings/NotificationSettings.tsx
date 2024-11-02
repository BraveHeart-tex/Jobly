"use client";
import { Switch } from "@/components/ui/switch";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import { useUpsertNotificationSettings } from "@/features/user/accountSettings/hooks/useUpsertNotificationSettings";
import { useUpsertEmailNotificationSettings } from "@/features/user/accountSettings/hooks/useUpsertEmailNotificationSettings";
import SettingBlock from "@/features/user/accountSettings/SettingBlock";
import SettingSectionTitle from "@/features/user/accountSettings/SettingSectionTitle";
import type { CandidateNotificationSettings } from "@/features/user/accountSettings/types";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { useEffect, useMemo } from "react";
import type { Nullable } from "@/lib/types";

interface NotificationSettingsProps {
  settings: Nullable<CandidateNotificationSettings>;
}

const NotificationSettings = ({ settings }: NotificationSettingsProps) => {
  const { emailNotificationSettings, generalNotificationSettings } =
    useMemo(() => {
      return {
        emailNotificationSettings: {
          jobAlerts: settings?.email?.jobAlerts ?? false,
          suitableJobPostings: settings?.email?.suitableJobPostings ?? false,
          followedJobPostingClosingDates:
            settings?.email?.followedJobPostingClosingDates ?? false,
        },
        generalNotificationSettings: {
          jobRecommendations: settings?.general?.jobRecommendations ?? false,
          applicationStatus: settings?.general?.applicationStatus ?? false,
        },
      };
    }, [settings]);

  const userEmail = useCurrentUserStore((state) => state.user?.email);

  const { upsertUserEmailNotificationSettings } =
    useUpsertEmailNotificationSettings();
  const { upsertNotificationSettings } = useUpsertNotificationSettings();

  useEffect(() => {
    if (!settings) return;
  }, [settings]);

  const handleGeneralNotificationSettingsChange = (
    key: keyof typeof generalNotificationSettings,
    value: boolean,
  ) => {
    upsertNotificationSettings({
      ...generalNotificationSettings,
      [key]: value,
    });
  };

  const handleEmailNotificationSettingsChange = (
    key: keyof typeof emailNotificationSettings,
    value: boolean,
  ) => {
    upsertUserEmailNotificationSettings({
      ...emailNotificationSettings,
      [key]: value,
    });
  };

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
            renderSettingControl={() => (
              <Switch
                checked={!!generalNotificationSettings.jobRecommendations}
                onCheckedChange={(value) =>
                  handleGeneralNotificationSettingsChange(
                    "jobRecommendations",
                    value,
                  )
                }
              />
            )}
          />
          <SettingBlock
            title="Application Status"
            description="Updates about your job applications"
            renderSettingControl={() => (
              <Switch
                checked={!!generalNotificationSettings.applicationStatus}
                onCheckedChange={(value) =>
                  handleGeneralNotificationSettingsChange(
                    "applicationStatus",
                    value,
                  )
                }
              />
            )}
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
            renderSettingControl={() => (
              <Switch
                checked={!!emailNotificationSettings.jobAlerts}
                onCheckedChange={(value) =>
                  handleEmailNotificationSettingsChange("jobAlerts", value)
                }
              />
            )}
          />
          <SettingBlock
            title="Job postings that match your skills and preferences"
            renderSettingControl={() => (
              <Switch
                checked={!!emailNotificationSettings.suitableJobPostings}
                onCheckedChange={(value) =>
                  handleEmailNotificationSettingsChange(
                    "suitableJobPostings",
                    value,
                  )
                }
              />
            )}
          />
          <SettingBlock
            title="Closing dates on bookmarked jobs"
            renderSettingControl={() => (
              <Switch
                checked={
                  !!emailNotificationSettings.followedJobPostingClosingDates
                }
                onCheckedChange={(value) =>
                  handleEmailNotificationSettingsChange(
                    "followedJobPostingClosingDates",
                    value,
                  )
                }
              />
            )}
          />
        </div>
      </div>
    </AccountSettingContentCard>
  );
};
export default NotificationSettings;
