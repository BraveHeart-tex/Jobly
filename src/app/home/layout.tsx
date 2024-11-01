import SetupCompanyInformationAlert from "@/features/employer/SetupCompanyInformationAlert";
import type React from "react";

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <main>
      {children}
      <SetupCompanyInformationAlert />
    </main>
  );
};

export default AppLayout;
