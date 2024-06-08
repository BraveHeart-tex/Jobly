"use client";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";
import MobileNavigationLinks from "@/components/MobileNavigationLinks";
import { EMPLOYEE_NAVIGATION_LINKS } from "@/lib/constants";

const NavigationLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {EMPLOYEE_NAVIGATION_LINKS.map((menuItem) => (
          <NavigationMenuItem key={menuItem.triggerLabel}>
            <NavigationMenuTrigger>{menuItem.triggerLabel}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                {menuItem.linkItems.map((linkItem) => (
                  <NavigationLinkItem href={linkItem.href} title={linkItem.title} key={linkItem.title}>
                    {linkItem.description}
                  </NavigationLinkItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <Link href="/search" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground",
              )}
            >
              Find Work
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const NavigationLinkItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

NavigationLinkItem.displayName = "NavigationLinkItem";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-max w-full border-b border-input bg-background/80 py-1 backdrop-blur-lg transition-colors">
      <div className="mx-auto flex max-w-7xl items-center lg:justify-between">
        <div className="ml-2 lg:hidden">
          <MobileNavigationLinks />
        </div>

        <Link href="/" className="flex select-none items-center gap-1">
          <Image src={"/logo.svg"} alt="Mims Logo" className="cursor-pointer" width={45} height={45} />
          <p className="text-base font-medium">Jobly</p>
        </Link>

        <div className="hidden lg:block">
          <NavigationLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
