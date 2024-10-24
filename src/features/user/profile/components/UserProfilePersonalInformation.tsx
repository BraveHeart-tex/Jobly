import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserAvatarDialog from "@/features/user/profile/components/UserAvatarDialog";
import EditProfileRecordButton from "@/features/user/profile/components/EditProfileRecordButton";
import AddProfileSectionDialog from "@/features/user/profile/components/dialogs/AddProfileSectionDialog";

interface UserProfilePersonalInformationProps {
  firstName: string;
  lastName: string;
  title?: string | null;
  city?: string | null;
  country?: string | null;
  employer?: string | null;
  websiteLink?: string | null;
  websiteLinkText?: string | null;
}

const UserProfilePersonalInformation = ({
  firstName,
  lastName,
  title,
  city,
  country,
  employer,
  websiteLink,
  websiteLinkText,
}: UserProfilePersonalInformationProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md rounded-md">
      <div className="relative">
        <div className="h-[200px] bg-gradient-to-r from-primary/50 to-primary/90 dark:from-primary/80 dark:to-primary/10 rounded-md rounded-b-none" />
        <UserAvatarDialog userFullName={`${firstName} ${lastName}`} />
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
          {country && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <p>
                {city && `${city}, `} {country}
              </p>
            </div>
          )}
          {employer && (
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              {employer}
            </div>
          )}
        </div>
        <div>
          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "p-0",
                }),
              )}
            >
              {websiteLinkText || websiteLink}
            </a>
          )}
        </div>

        <AddProfileSectionDialog className="mt-4" />
      </CardContent>
    </Card>
  );
};
export default UserProfilePersonalInformation;
