import Logo from "@/app/components/Logo";
import NavItem from "@/app/components/NavItem";
import { LINK_ITEMS, cn } from "@/lib/utils";

const SidebarContent = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed transition-all border-r border-r-gray-200 h-full dark:border-r-gray-700 w-full md:w-60 bg-facebook dark:bg-gray-800",
        className
      )}
    >
      <div className="flex h-20 items-center mx-8 justify-between mt-3">
        <Logo />
      </div>
      {LINK_ITEMS.map((link) => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </div>
  );
};

export default SidebarContent;
