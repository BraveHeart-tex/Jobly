import DesktopNavigationLinks from "@/components/DesktopNavigationLinks";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import { APP_NAME } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ColorModeToggle from "@/components/ColorModeToggle";
import NavbarContainer from "@/components/NavbarContainer";
import UserMenu from "@/components/UserMenu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = async () => {
  const currentUser = await api.auth.getCurrentUser();

  return (
    <NavbarContainer>
      <div className="mx-auto flex max-w-screen-2xl items-center lg:justify-between px-3">
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
                    <Link
                      href={`${SHARED_ROUTES.LOGIN}?portalType=candidate`}
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                        }),
                      )}
                    >
                      Candidate Login
                    </Link>
                    <Link
                      href={`${SHARED_ROUTES["SIGN-UP"]}?portalType=candidate`}
                      className={cn(
                        buttonVariants({
                          variant: "default",
                        }),
                      )}
                    >
                      Sign Up
                    </Link>
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
                    <Link
                      href={`${SHARED_ROUTES.LOGIN}?portalType=employer`}
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                        }),
                      )}
                    >
                      Employer Login
                    </Link>
                    <Link
                      href={`${SHARED_ROUTES["SIGN-UP"]}?portalType=employer`}
                      className={cn(
                        buttonVariants({
                          variant: "default",
                        }),
                      )}
                    >
                      Sign Up
                    </Link>
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
