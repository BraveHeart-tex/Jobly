import { ReactNode } from "react";
import MobileNav from "@/components/MobileNav";
import SidebarContent from "@/components/SidebarContent";

export default async function SidebarWithHeader({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/50">
      <SidebarContent className="hidden lg:block" />
      {/* mobile nav */}
      <MobileNav />
      {/* main content */}
      <div className="ml-0 lg:ml-[15rem] p-4 lg:p-8">{children}</div>
    </div>
  );
}
