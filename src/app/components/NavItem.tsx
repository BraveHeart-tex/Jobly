import Link from "next/link";
import { ReactNode, createElement } from "react";
import { IconType } from "react-icons";
import ActiveLinkAnimation from "@/app/animations/ActiveLinkAnimation";

interface NavItemProps {
  icon: IconType;
  children: ReactNode;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon, children, href }: NavItemProps) => {
  return (
    <Link
      href={href}
      className="relative flex items-center p-4 mx-4 rounded-lg cursor-pointer text-white hover:bg-facebook-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all"
    >
      <ActiveLinkAnimation href={href} />
      <span className="relative flex items-center">
        {icon && createElement(icon, { className: "mr-4 text-md text-white" })}
        {children}
      </span>
    </Link>
  );
};
export default NavItem;
