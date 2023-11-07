import SidebarContent from "@/app/components/SidebarContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiMenu } from "react-icons/fi";

const MobileNavigationDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open side navigation menu"
        className="flex md:hidden border bg-transparent text-white border-white hover:bg-facebook-300 hover:dark:bg-gray-700 hover:text-white"
      >
        <FiMenu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavigationDrawer;
