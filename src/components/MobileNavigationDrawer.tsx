import SidebarContent from "@/app/components/SidebarContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiMenu } from "react-icons/fi";

const MobileNavigationDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open side navigation menu"
        name="mobile-navigation-drawer"
        className="flex md:hidden border dark:border-0 bg-transparent text-white border-white hover:bg-facebook-300 hover:dark:bg-gray-700 hover:text-white p-2 rounded-md"
      >
        <FiMenu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px] text-white">
        <SidebarContent fromDrawer />
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavigationDrawer;
