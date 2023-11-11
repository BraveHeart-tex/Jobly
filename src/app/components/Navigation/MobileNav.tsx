"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Logo from "../Logo";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BiExit } from "react-icons/bi";
import ModeToggle from "@/components/ModeToggle";
import MobileNavigationDrawer from "@/components/MobileNavigationDrawer";

const MobileNav = ({ username }: { username: string }) => {
  return (
    <div className="flex ml-0 md:ml-[15rem] px-[1rem] h-[5rem] items-center border-b bg-facebook dark:bg-gray-800 justify-between md:justify-end">
      <MobileNavigationDrawer />
      <div className="block md:hidden">
        <Logo width="100px" height="100px" />
      </div>

      <div className="flex items-center gap-0 md:gap-6">
        <div className="flex items-center">
          <UserMenu name={username || ""} />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

const UserMenu = ({ name }: { name: string }) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-facebook dark:hover:bg-gray-700">
          <span className="sr-only">Open user menu</span>
          <div className={"rounded-full bg-facebook-400 w-8 h-8 flex items-center justify-center dark:bg-gray-700"}>
            <span className="text-white text-[14px] font-semibold">{firstName[0] + lastName[0]}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={"end"} className="p-0 pb-2 w-[200px] bg-facebook dark:bg-gray-800 text-white">
        <ul>
          <li className="hover:bg-facebook-400 dark:border-b dark:border-b-gray-500 dark:rounded-none dark:hover:bg-gray-700 px-2 rounded-md transition-all py-2 cursor-pointer">
            <span className="font-semibold">{name || ""}</span>
          </li>
          <hr />
          <div className="grid gap-2 mt-[5px]">
            <li
              className="hover:bg-facebook-400 dark:hover:bg-gray-700 px-2 transition-all py-1 cursor-pointer flex items-center gap-1 font-semibold"
              onClick={() => signOut()}
            >
              <BiExit className="w-5 h-5 text-white" size={16} />
              <span className="cursor-pointer text-[14px]">Logout</span>
            </li>
          </div>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MobileNav;
