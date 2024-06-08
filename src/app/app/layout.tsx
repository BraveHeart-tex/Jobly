import React from "react";
import Navbar from "@/components/Navbar";

type HomeLayoutProps = {
  children?: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default HomeLayout;
