import DesktopNavigationLinks from "@/components/DesktopNavigationLinks";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import { ROUTES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import ColorModeToggle from "./ColorModeToggle";
import { api } from "@/trpc/server";
import UserMenu from "./UserMenu";

const Navbar = async () => {
  const currentUser = await api.auth.getCurrentUser();
  return (
    <nav className="sticky top-0 z-50 h-max w-full border-b border-input bg-background/80 py-1 backdrop-blur-lg transition-colors">
      <div className="mx-auto flex max-w-screen-2xl items-center lg:justify-between pr-1">
        <div className="ml-2 lg:hidden">
          <MobileNavigationLinks />
        </div>

        <Link
          href={ROUTES.HOME}
          className="flex select-none items-center gap-1"
        >
          <Image
            src={"/logo.svg"}
            alt="Mims Logo"
            className="cursor-pointer"
            width={45}
            height={45}
          />
          <p className="text-base font-medium">Jobly</p>
        </Link>

        <div className="hidden lg:block">
          <DesktopNavigationLinks />
        </div>
        <div className="ml-auto lg:ml-0 flex items-center gap-1">
          <UserMenu user={currentUser} />
          <ColorModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
