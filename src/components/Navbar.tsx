import ColorModeToggle from "@/components/ColorModeToggle";
import DesktopNavigationLinks from "@/components/DesktopNavigationLinks";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import NavbarContainer from "@/components/NavbarContainer";
import UserMenu from "@/components/UserMenu";
import { APP_NAME } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import GuestAuthPopover from "./GuestAuthPopover";

const Navbar = async () => {
  const currentUser = await api.auth.getCurrentUser();
  return (
    <NavbarContainer>
      <div className="mx-auto flex max-w-screen-2xl items-center lg:justify-between px-3">
        <div className="lg:hidden">
          <MobileNavigationLinks />
        </div>

        <Link
          href={SHARED_ROUTES.HOME}
          className="flex select-none items-center gap-1"
        >
          <Image
            src={"/logo.svg"}
            alt={`${APP_NAME} Logo`}
            className="cursor-pointer"
            width={45}
            height={45}
            priority
          />
          <p className="text-base font-medium">{APP_NAME}</p>
        </Link>

        <div className="hidden lg:block">
          <DesktopNavigationLinks />
        </div>
        <div className="ml-auto lg:ml-0 flex items-center gap-1">
          {currentUser ? (
            <>
              <UserMenu user={currentUser} />
              <ColorModeToggle />
            </>
          ) : (
            <GuestAuthPopover />
          )}
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
