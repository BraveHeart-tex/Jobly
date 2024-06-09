import type { ROUTES } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

export type NavigationMenuItem = {
  triggerLabel: string;
  linkItems: NavigationMenuItemLink[];
};

export type NavigationMenuItemLink = {
  title: string;
  href: (typeof ROUTES)[keyof typeof ROUTES];
  description: string;
  icon: LucideIcon;
};

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
