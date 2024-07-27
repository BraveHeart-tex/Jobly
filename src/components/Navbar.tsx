import DesktopNavigationLinks from "@/components/DesktopNavigationLinks";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import { APP_NAME } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import ColorModeToggle from "./ColorModeToggle";
import NavbarContainer from "./NavbarContainer";
import UserMenu from "./UserMenu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";

const Navbar = async () => {
  const currentUser = await api.auth.getCurrentUser();

  return (
    <NavbarContainer>
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
          {currentUser ? (
            <>
              <UserMenu user={currentUser} />
              <ColorModeToggle />
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex items-center gap-1">
                  <span>Login / Sign Up</span>
                  <ChevronDownIcon size={17} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="px-0">
                <div className="grid gap-4 border-b px-4 pb-4">
                  <div className="grid gap-2 text-sm">
                    <h3 className="font-semibold">
                      Candidate (Looking for a job?)
                    </h3>
                    <p className="text-muted-foreground">
                      Discover the perfect job for you!
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">Candidate Login</Button>
                    <Button>Sign Up</Button>
                  </div>
                </div>
                <div className="grid gap-4 px-4 mt-4">
                  <div className="grid gap-2 text-sm">
                    <h3 className="font-semibold">Employer</h3>
                    <p className="text-muted-foreground">
                      We have the perfect candidate for you
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Employer Login</Button>
                    <Button>Sign Up</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
