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
import SettingContentCard from "@/features/user/accountSettings/SettingContentCard";

const AccountSecuritySettings = () => {
  return (
    <SettingContentCard
      title="Security Settings"
      description="Manage your security preferences and two-factor authentication"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">
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

        <div className="pt-4">
          <Button variant="destructive">Sign Out All Other Sessions</Button>
        </div>
      </div>
    </SettingContentCard>
  );
};
export default AccountSecuritySettings;
