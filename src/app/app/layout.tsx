import React from "react";
import Navbar from "@/components/Navbar";

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
