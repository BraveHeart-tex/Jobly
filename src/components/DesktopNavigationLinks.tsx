import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { EMPLOYEE_NAVIGATION_LINKS, ROUTES } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DesktopNavigationLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {EMPLOYEE_NAVIGATION_LINKS.map((menuItem) => (
          <NavigationMenuItem key={menuItem.triggerLabel}>
            <NavigationMenuTrigger>
              {menuItem.triggerLabel}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                {menuItem.linkItems.map((linkItem) => (
                  <NavigationLinkItem
                    href={linkItem.href}
                    title={linkItem.title}
                    key={linkItem.title}
                    icon={linkItem.icon}
                  >
                    {linkItem.description}
                  </NavigationLinkItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <Link href={ROUTES.JOBS}>
          <Button>Find Work</Button>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigationLinks;

const NavigationLinkItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  const ItemIcon = props?.icon;

  return (
    <li>
      <NavigationMenuLink>
        <Link
          href={props.href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-1 text-sm font-medium leading-none">
            {ItemIcon ? <ItemIcon size={21} /> : null}
            {title}
          </div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

NavigationLinkItem.displayName = "NavigationLinkItem";
