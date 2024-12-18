"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, User, Shield } from "lucide-react";
import PersonalAccountSettings from "@/features/user/accountSettings/PersonalAccountSettings";
import AccountSecuritySettings from "@/features/user/accountSettings/AccountSecuritySettings";
import NotificationSettings from "@/features/user/accountSettings/NotificationSettings";
import PrivacySettings from "@/features/user/accountSettings/PrivacySettings";
import { useGetCandidateAccountSettings } from "@/features/user/accountSettings/hooks/useGetCandidateAccountSettings";
import SettingsSkeleton from "@/features/user/accountSettings/AccountSettingsSkeleton";
import { useQueryState } from "nuqs";

const AccountSettingsTabs = () => {
  const [selectedTab, setSelectedTab] = useQueryState("selectedTab", {
    defaultValue: "personal",
  });

  const { accountSettings, isFetchingAccountSettings } =
    useGetCandidateAccountSettings();

  if (isFetchingAccountSettings) return <SettingsSkeleton />;

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="space-y-2"
    >
      <TabsList className="fixed bottom-0 right-0 w-screen lg:relative grid grid-cols-4 lg:w-full h-14 lg:h-max rounded-none lg:rounded-md z-10">
        <TabsTrigger
          value="personal"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <User className="h-4 w-4" />
          Personal
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <Lock className="h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <Shield className="h-4 w-4" />
          Privacy
        </TabsTrigger>
      </TabsList>

      <div className="pb-14 lg:pb-0">
        <TabsContent value="personal" className="h-full">
          <PersonalAccountSettings />
        </TabsContent>

        <TabsContent value="security" className="h-full">
          <AccountSecuritySettings
            devices={accountSettings?.deviceSessions || null}
          />
        </TabsContent>

        <TabsContent value="notifications" className="h-full">
          <NotificationSettings
            settings={accountSettings?.notificationSettings || null}
          />
        </TabsContent>

        <TabsContent value="privacy" className="h-full">
          <PrivacySettings
            privacySettings={accountSettings?.privacySettings || null}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AccountSettingsTabs;
