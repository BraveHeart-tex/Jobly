"use client";
import { cn } from "@/lib/utils";
import { matchPathnameToEditPath } from "@/lib/utils/stringUtils";
import { usePathname } from "next/navigation";
import type React from "react";

interface NavbarContainerProps {
  children: React.ReactNode;
}

const NavbarContainer = ({ children }: NavbarContainerProps) => {
  const pathname = usePathname();
  const shouldMinimize = pathname && matchPathnameToEditPath(pathname);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 h-max w-full border-b border-input bg-background/80 py-1 backdrop-blur-lg transition-colors",
        shouldMinimize && "hidden",
      )}
    >
      {children}
    </nav>
  );
};

export default NavbarContainer;
