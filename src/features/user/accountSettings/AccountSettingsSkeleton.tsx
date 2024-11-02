import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Lock, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SettingsSkeleton = () => {
  return (
    <Tabs defaultValue="personal" className="space-y-2">
      <TabsList className="fixed bottom-0 right-0 w-screen lg:relative grid grid-cols-4 lg:w-full h-14 lg:h-max rounded-none lg:rounded-md">
        <TabsTrigger
          value="personal"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <User className="h-4 w-4" />
          Personal
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <Lock className="h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="flex flex-col lg:flex-row items-center gap-2 text-xs sm:text-sm"
        >
          <Shield className="h-4 w-4" />
          Privacy
        </TabsTrigger>
      </TabsList>

      {["personal", "security", "notifications", "privacy"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Row 1 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Toggle/Switch rows */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-72" />
                    </div>
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SettingsSkeleton;
