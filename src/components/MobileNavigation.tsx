"use client";
import { LINK_ITEMS, cn } from "@/lib/utils";
import { createElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-100 dark:bg-gray-800 border-t border-border lg:hidden">
      <div className="flex items-center justify-between h-full w-full mx-auto font-medium overflow-auto">
        {LINK_ITEMS.sort((a, b) => a.order - b.order).map((link, index) => (
          <Link
            href={link.href}
            aria-describedby="mobile-navigation"
            aria-label={`Navigate to ${link.name} page`}
            key={link.href}
            className={cn(
              "inline-flex h-full whitespace-nowrap flex-1 flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-700 group",
              isActive(link.href) && "bg-gray-300 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-900"
            )}
          >
            {link.icon &&
              createElement(link.icon, {
                className: cn("w-6 h-6 mb-2 text-foreground/60", isActive(link.href) && "text-facebook"),
              })}
            <span
              className={cn(
                "text-xs hidden md:inline text-foreground group-hover:text-facebook dark:group-hover:text-facebook-300",
                isActive(link.href) && "text-facebook dark:text-foreground"
              )}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MobileNavigation;
