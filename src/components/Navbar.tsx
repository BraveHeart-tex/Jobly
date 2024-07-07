import DesktopNavigationLinks from "@/components/DesktopNavigationLinks";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import { APP_NAME } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import ColorModeToggle from "./ColorModeToggle";
import UserMenu from "./UserMenu";
import { headers } from "next/headers";
import { cn, matchPathnameToEditPath } from "@/lib/utils";

const Navbar = async () => {
  const headersUrl = headers().get("x-url");
  const pathname = headersUrl && new URL(headersUrl as string).pathname;
  const shouldMinimize = pathname && matchPathnameToEditPath(pathname);
  const currentUser = await api.auth.getCurrentUser();

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 h-max w-full border-b border-input bg-background/80 py-1 backdrop-blur-lg transition-colors",
        shouldMinimize && "hidden",
      )}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center lg:justify-between pr-1">
        <div className="ml-2 lg:hidden">
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
          />
          <p className="text-base font-medium">{APP_NAME}</p>
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
