import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, EyeIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

const UserProfileAnalyticsSection = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-0 flex flex-col justify-between">
        <div className="mb-4 p-4">
          <h2 className="text-2xl font-bold">Analytics</h2>
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

        <Link
          href={"#"}
          className="w-full px-2 py-[0.625rem] z-5 border-t border-b-0 bg-card text-center rounded-md rounded-t-none hover:bg-secondary transition-all"
        >
          <div className="flex items-center gap-1 justify-center text-base font-semibold">
            <p>Show all analytics</p>
            <ArrowRightIcon />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
export default UserProfileAnalyticsSection;
