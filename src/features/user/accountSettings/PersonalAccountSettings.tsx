import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingContentCard from "@/features/user/accountSettings/SettingContentCard";

const PersonalAccountSettings = () => {
  return (
    <SettingContentCard
      title="Personal Information"
      description="Update your personal details and profile information"
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/api/placeholder/100/100" />
          <AvatarFallback>UP</AvatarFallback>
        </Avatar>
        <Button>Change Picture</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input id="name" placeholder="Enter your first name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Last Name</Label>
          <Input id="name" placeholder="Enter your last name" />
        </div>
      </div>

      <div className="space-y-2">
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
    </SettingContentCard>
  );
};
export default PersonalAccountSettings;
