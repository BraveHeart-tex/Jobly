"use client";

import type { GetCurrentUserReturnType } from "@/actions/auth";
import UserAvatar from "@/components/common/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/features/auth/utils";
import { EMPLOYER_ROUTES, SHARED_ROUTES } from "@/lib/routes";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { BuildingIcon, KeyRoundIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface UserMenuProps {
  user: GetCurrentUserReturnType;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const setUser = useCurrentUserStore((state) => state.setUser);

  const userMenuProfileLinks = [
    {
      title: "Profile",
      href: SHARED_ROUTES.EDIT_PROFILE,
      icon: UserIcon,
    },
    {
      title: "Account",
      href: SHARED_ROUTES.ACCOUNT_SETTINGS,
      icon: KeyRoundIcon,
    },
    ...(user.role === "employer"
      ? [
          {
            title: "Company Profile",
            href: EMPLOYER_ROUTES.COMPANY_PROFILE,
            icon: BuildingIcon,
          },
        ]
      : []),
  ];

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  const handleSignOut = () => {
    signOut(user.role);
    setUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="grid">
            <span>
              {user.firstName} {user.lastName}
            </span>
            <span className="text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div>
          {userMenuProfileLinks.map((link) => (
            <DropdownMenuItem
              key={link.title}
              className="flex items-center gap-1 font-medium"
              asChild
            >
              <Link href={link.href}>
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center justify-center font-medium"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
