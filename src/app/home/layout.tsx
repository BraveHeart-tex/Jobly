import Navbar from "@/components/Navbar";
import type React from "react";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AppLayout;
