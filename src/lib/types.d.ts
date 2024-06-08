import { type LucideIcon } from "lucide-react";

export type NavigationMenuItem = {
  triggerLabel: string;
  linkItems: NavigationMenuItemLink[];
};

export type NavigationMenuItemLink = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};
