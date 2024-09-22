import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Briefcase, MapPin, MessageSquare, UserPlus } from "lucide-react";

const UserProfileCard = () => {
  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader className="relative h-24 bg-gradient-to-r from-blue-600 to-blue-400">
        <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 border-4 border-white">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="Profile picture"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="pt-12 pb-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Jane Doe</h2>
          <p className="text-sm text-gray-500">
            Senior Software Engineer at Tech Corp
          </p>
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <MapPin size={14} />
            <span>San Francisco Bay Area</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <Briefcase size={14} />
            <span>500+ connections</span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold">Skills & Endorsements</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Node.js</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="flex-1 mr-2">
          <MessageSquare className="w-4 h-4 mr-2" />
          Message
        </Button>
        <Button variant="outline" className="flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};
export default UserProfileCard;
