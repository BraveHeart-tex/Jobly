import "../globals.css";
import SidebarWithHeader from "../components/Sidebar";
import getCurrentUser from "../actions/getCurrentUser";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Jobly | Dashboard",
  description: "Dashboard for Jobly where you can manage your jobs applications.",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const currentUser = await getServerSession();
  return <SidebarWithHeader username={currentUser?.user?.name || ""}>{children}</SidebarWithHeader>;
}
