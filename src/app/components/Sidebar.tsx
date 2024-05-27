import { ReactNode } from "react";
import MobileNav from "@/app/components/MobileNav";
import SidebarContent from "@/app/components/SidebarContent";

export default async function SidebarWithHeader({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarContent className="hidden lg:block" />
      {/* mobile nav */}
      <MobileNav />
      {/* main content */}
      <div className="ml-0 lg:ml-[15rem] p-4 lg:p-8">{children}</div>
    </div>
  );
}
