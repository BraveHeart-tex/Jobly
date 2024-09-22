import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, SearchIcon, UsersIcon } from "lucide-react";

const UserProfileStats = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Profile Stats</h2>
          <div className="flex items-center gap-1 text-muted-foreground">
            <EyeIcon className="size-5" />
            <p className="text-sm">Exclusive to you</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div className="flex gap-2">
              <UsersIcon className="mt-[2px]" />
              <div>
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                  10 Profile Views
                </h4>
                <p className="text-sm">
                  Discover who is looking at your profile.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <SearchIcon className={"mt-[2px]"} />
              <div>
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                  10 Search Views
                </h4>
                <p className="text-sm">
                  See how often you appear in search results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default UserProfileStats;
