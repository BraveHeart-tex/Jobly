"use client";
import Logo from "@/app/components/Logo";
import ModeToggle from "@/components/ModeToggle";
import MobileNavigationDrawer from "@/components/MobileNavigationDrawer";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const MobileNav = () => {
  const { theme } = useTheme();

  return (
    <div className="flex ml-0 md:ml-[15rem] px-[1rem] h-[5rem] items-center border-b bg-facebook dark:bg-gray-800 justify-between md:justify-end">
      <MobileNavigationDrawer />
      <div className="block md:hidden">
        <Logo width="100px" height="100px" />
      </div>

      <div className="flex items-center gap-0 md:gap-2">
        <UserButton
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
        <ModeToggle />
      </div>
    </div>
  );
};

export default MobileNav;
