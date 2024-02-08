import { ReactNode } from "react";
import MobileNav from "@/app/components/MobileNav";
import SidebarContent from "@/app/components/SidebarContent";

export default async function SidebarWithHeader({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <SidebarContent className="hidden md:block" />
      {/* mobile nav */}
      <MobileNav />
      {/* main content */}
      <div className="ml-0 md:ml-[15rem] p-4 lg:p-16">{children}</div>
    </div>
  );
}
