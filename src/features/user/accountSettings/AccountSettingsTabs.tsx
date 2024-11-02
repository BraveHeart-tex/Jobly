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
      <TabsList className="fixed bottom-0 right-0 w-screen lg:relative grid grid-cols-4 lg:w-full h-14 lg:h-max rounded-none lg:rounded-md">
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

      <TabsContent value="personal">
        <PersonalAccountSettings />
      </TabsContent>

      <TabsContent value="security">
        <AccountSecuritySettings />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings
          settings={
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            accountSettings?.notificationSettings!
          }
        />
      </TabsContent>

      <TabsContent value="privacy">
        <PrivacySettings />
      </TabsContent>
    </Tabs>
  );
};

export default AccountSettingsTabs;
