import "../globals.css";
import SidebarWithHeader from "../components/Sidebar";
import MobileNavigaiton from "@/components/MobileNavigaiton";

export const metadata = {
  title: "Jobly | Dashboard",
  description: "Dashboard for Jobly where you can manage your jobs applications.",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarWithHeader>
      {children}
      <MobileNavigaiton />
    </SidebarWithHeader>
  );
}
