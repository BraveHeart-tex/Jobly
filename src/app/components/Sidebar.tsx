import { ReactNode } from "react";
import MobileNav from "./Navigation/MobileNav";
import SidebarContent from "./SidebarContent";

export default function SidebarWithHeader({ children, username }: { children: ReactNode; username: string }) {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <SidebarContent className="hidden md:block" />
      {/* mobile nav */}
      <MobileNav username={username} />
      {/* main content */}
      <div className="ml-0 md:ml-[15rem] p-4 lg:p-16">{children}</div>
    </div>
  );
}
