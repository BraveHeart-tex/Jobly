import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import AddProfileSectionDialog from "./dialogs/AddProfileSectionDialog";
import EditProfileRecordButton from "./EditProfileRecordButton";

interface UserProfilePersonalInformationProps {
  firstName: string;
  lastName: string;
  title?: string;
  city?: string;
  country?: string;
  employer?: string;
}

const UserProfilePersonalInformation = ({
  firstName,
  lastName,
  title,
  city,
  country,
  employer,
}: UserProfilePersonalInformationProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md rounded-md">
      <div className="relative">
        <div className="h-[200px] bg-gradient-to-r from-primary/50 to-primary/90 dark:from-primary/80 dark:to-primary/10 rounded-md rounded-b-none" />
        <Avatar className="cursor-pointer absolute bottom-0 left-6 transform translate-y-1/3 w-[9.5rem] h-[9.5rem] rounded-full">
          <AvatarImage src="/default-avatar.svg" alt="Profile picture" />
          <AvatarFallback className="text-lg">BK</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="pt-1 pb-6 px-4">
        <div className="flex justify-end mb-4 w-full">
          <EditProfileRecordButton modalLink="personalDetails" />
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            {firstName} {lastName}
          </h1>
          {title && <p className="text-lg">{title}</p>}
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <p>
              {city && `${city}, `} {country}
            </p>
            <Button
              variant={"link"}
              className="p-0 ml-2 h-max text-[14px] underline-offset-1"
            >
              Contact Information
            </Button>
          </div>
          {employer && (
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              {employer}
            </div>
          )}
        </div>

        <AddProfileSectionDialog className="mt-4" />
      </CardContent>
    </Card>
  );
};
export default UserProfilePersonalInformation;
