import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, PenSquare } from "lucide-react";

const UserProfilePersonalInformation = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md rounded-md">
      <div className="relative">
        <div className="h-[200px] bg-gradient-to-r from-primary/50 to-primary/90 dark:from-primary/80 dark:to-primary/10 rounded-md rounded-b-none" />
        <Avatar className="absolute bottom-0 left-6 transform translate-y-1/3 w-[9.5rem] h-[9.5rem] border-4 border-white rounded-full">
          <AvatarImage src="/default-avatar.svg" alt="Profile picture" />
          <AvatarFallback className="text-lg">BK</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="pt-1 pb-8 px-4">
        <div className="flex justify-end mb-4 w-full">
          <Button variant="ghost" size={"icon"} className={"-mr-4 -mt-[3px]"}>
            <PenSquare className="w-6 h-6" />
          </Button>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold">Bora Karaca</h1>
          <p className="text-lg">
            Senior Software Engineer | React | Node.js | TypeScript
          </p>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <p>Istanbul, Turkey</p>
            <Button
              variant={"link"}
              className="p-0 ml-2 h-max text-[14px] underline-offset-1"
            >
              Contact Information
            </Button>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Mims Yazılım A.Ş.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default UserProfilePersonalInformation;
