"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import { useSignOutDevice } from "@/features/user/accountSettings/hooks/useSignOutDevice";
import SettingSectionTitle from "@/features/user/accountSettings/SettingSectionTitle";
import SignOutAllOtherSessionsButton from "@/features/user/accountSettings/SignOutAllOtherSessionsButton";
import type {
  DeviceSession,
  GetCandidateAccountSettingsReturnType,
} from "@/features/user/accountSettings/types";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import type { Nullable } from "@/lib/types";
import {
  SmartphoneIcon,
  TabletIcon,
  GamepadIcon,
  MonitorIcon,
  WatchIcon,
  GlassesIcon,
  CpuIcon,
  LaptopIcon,
} from "lucide-react";
import { DateTime } from "luxon";

interface AccountSecuritySettingsProps {
  devices: Nullable<GetCandidateAccountSettingsReturnType["deviceSessions"]>;
}

const AccountSecuritySettings = ({ devices }: AccountSecuritySettingsProps) => {
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const { signOutDevice, isSigningOutDevice } = useSignOutDevice();

  const handleSignOutDevice = (device: DeviceSession) => {
    if (isSigningOutDevice) return;
    showConfirmDialog({
      title: `Are you sure you want to sign out ${device.deviceName}?`,
      message: "You will be signed out of this device.",
      primaryActionLabel: "Sign Out",
      onConfirm: () => {
        signOutDevice({
          sessionId: device.sessionId,
        });
      },
    });
  };

  const getDeviceIcon = (deviceType: string | null) => {
    const iconMap = {
      desktop: TabletIcon,
      mobile: SmartphoneIcon,
      tablet: TabletIcon,
      console: GamepadIcon,
      smarttv: MonitorIcon,
      wearable: WatchIcon,
      xr: GlassesIcon,
      embedded: CpuIcon,
    };
    const Icon = iconMap[deviceType as keyof typeof iconMap] || LaptopIcon;
    return <Icon />;
  };

  return (
    <AccountSettingContentCard
      title="Security Settings"
      description="Manage your security preferences and two-factor authentication"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch />
        </div>

        <div className="space-y-2">
          <Label htmlFor="2fa-method">2FA Method</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select 2FA method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="authenticator">Authenticator App</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-between gap-4">
            <SettingSectionTitle>Devices</SettingSectionTitle>
            <SignOutAllOtherSessionsButton
              disabled={isSigningOutDevice || (devices?.length || 0) < 2}
            />
          </div>
          <hr />
          <Table>
            <TableHeader>
              <TableRow className="whitespace-nowrap">
                <TableHead>Device Name</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No devices found
                  </TableCell>
                </TableRow>
              )}
              {devices?.map((device) => (
                <TableRow key={device.id} className="whitespace-nowrap">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device?.deviceType)}
                      {device.deviceName}
                    </div>
                  </TableCell>
                  <TableCell>
                    {DateTime.fromISO(device.lastActive as string).toFormat(
                      "MMM d, yyyy, h:mm a",
                    )}
                  </TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      type="button"
                      disabled={isSigningOutDevice}
                      variant="outline"
                      onClick={() => handleSignOutDevice(device)}
                    >
                      Sign out
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AccountSettingContentCard>
  );
};
export default AccountSecuritySettings;
