import "../globals.css";
import SidebarWithHeader from "../components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";

export const metadata = {
  title: "Jobly | Dashboard",
  description: "Dashboard for Jobly where you can manage your jobs applications.",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarWithHeader>
      <MobileNavigation />
      {/* Padding Bottom is the same height as the height of the mobile navigation menu  */}
      <main className="pb-16">{children}</main>
    </SidebarWithHeader>
  );
}
