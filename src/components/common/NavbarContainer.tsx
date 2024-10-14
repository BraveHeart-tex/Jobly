"use client";
import { cn } from "@/lib/utils";
import { matchPathnameToEditPath } from "@/lib/utils/string";
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
        "fixed top-0 z-50 h-max w-full border-b border-input py-1 transition-colors bg-background",
        shouldMinimize && "hidden",
      )}
    >
      {children}
    </nav>
  );
};

export default NavbarContainer;
