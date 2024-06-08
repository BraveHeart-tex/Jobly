"use client";
import Link from "next/link";
import Image from "next/image";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import DesktopNavigationLinks from "@/components/DesktopNavigationLinks";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-max w-full border-b border-input bg-background/80 py-1 backdrop-blur-lg transition-colors">
      <div className="mx-auto flex max-w-7xl items-center lg:justify-between">
        <div className="ml-2 lg:hidden">
          <MobileNavigationLinks />
        </div>

        <Link href="/" className="flex select-none items-center gap-1">
          <Image src={"/logo.svg"} alt="Mims Logo" className="cursor-pointer" width={45} height={45} />
          <p className="text-base font-medium">Jobly</p>
        </Link>

        <div className="hidden lg:block">
          <DesktopNavigationLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
