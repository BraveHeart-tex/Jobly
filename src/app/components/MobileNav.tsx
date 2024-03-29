"use client";
import Logo from "@/app/components/Logo";
import ModeToggle from "@/components/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const MobileNav = () => {
  const { theme } = useTheme();

  return (
    <div className="flex ml-0 lg:ml-[15rem] px-[1rem] h-[5rem] items-center border-b bg-facebook dark:bg-gray-800 justify-between lg:justify-end">
      <div className="block lg:hidden">
        <Logo width="100px" height="100px" />
      </div>

      <div className="flex items-center gap-1 lg:gap-2">
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
