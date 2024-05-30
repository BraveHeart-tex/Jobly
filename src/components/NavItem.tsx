import Link from "next/link";
import { ReactNode, createElement } from "react";
import { IconType } from "react-icons";
import ActiveLinkAnimation from "@/components/animations/ActiveLinkAnimation";

interface NavItemProps {
  icon: IconType;
  children: ReactNode;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon, children, href }: NavItemProps) => {
  return (
    <Link href={href} className="relative flex items-center p-4 mx-4 rounded-lg cursor-pointer">
      <ActiveLinkAnimation href={href} />
      <span className="relative flex items-center font-medium gap-2">
        {icon && createElement(icon, { className: "text-md" })}
        {children}
      </span>
    </Link>
  );
};
export default NavItem;
