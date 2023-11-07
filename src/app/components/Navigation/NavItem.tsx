import Link from "next/link";
import { ReactNode, createElement } from "react";
import { IconType } from "react-icons";

interface NavItemProps {
  icon: IconType;
  children: ReactNode;
  href: string;
}

const NavItem = ({ icon, children, href }: NavItemProps) => {
  return (
    <Link href={href}>
      <div className="flex items-center p-4 mx-4 rounded-lg cursor-pointer text-white hover:bg-facebook-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all hover:translate-x-2">
        {icon && createElement(icon, { className: "mr-4 text-md text-white" })}
        {children}
      </div>
    </Link>
  );
};
export default NavItem;
