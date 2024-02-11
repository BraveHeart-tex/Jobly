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
      {children}
      <MobileNavigation />
    </SidebarWithHeader>
  );
}
