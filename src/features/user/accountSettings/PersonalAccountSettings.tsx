import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AccountSettingContentCard from "@/features/user/accountSettings/AccountSettingContentCard";
import AvatarSettings from "@/features/user/accountSettings/AvatarSettings";

const PersonalAccountSettings = () => {
  return (
    <AccountSettingContentCard
      title="Personal Information"
      description="Update your personal details and profile information"
    >
      <div className="flex items-center gap-10">
        <AvatarSettings />
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name">First Name</Label>
              <Input id="name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Last Name</Label>
              <Input id="name" placeholder="Enter your last name" />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="accountType">Account Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="candidate">Candidate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </AccountSettingContentCard>
  );
};
export default PersonalAccountSettings;
