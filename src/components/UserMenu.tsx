"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/actions";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import type { User } from "lucia";
import { LockIcon, UserIcon } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { CANDIDATE_ROUTES, SHARED_ROUTES } from "@/lib/routes";
import Link from "next/link";

type UserMenuProps = {
  user: User;
};

const UserMenu = ({ user }: UserMenuProps) => {
  const setUser = useCurrentUserStore((state) => state.setUser);

  const userMenuProfileLinks = [
    {
      title: "Edit Profile",
      // TODO: Will be set by the user later on
      href: `${SHARED_ROUTES.HOME}/users/${user.id}`,
      icon: UserIcon,
    },
    {
      title: "Privacy Settings",
      href: CANDIDATE_ROUTES.PRIVACY_SETTINGS,
      icon: LockIcon,
    },
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
        <Avatar>
          <AvatarFallback>
            {user.firstName.charAt(0) + user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
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
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          {userMenuProfileLinks.map((link) => (
            <DropdownMenuItem
              key={link.title}
              className="flex items-center gap-2"
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
          className="flex items-center justify-center"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
