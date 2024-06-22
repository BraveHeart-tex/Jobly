"use client";

import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import type { User } from "lucia";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

import { signOut } from "@/lib/auth/actions";

type UserMenuProps = {
  user: User;
};

const UserMenu = ({ user }: UserMenuProps) => {
  const { setUser } = useCurrentUserStore();

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  const handleSignOut = () => {
    setUser(null);
    signOut();
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
          {user.firstName} {user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-1"
          onClick={handleSignOut}
        >
          <LogOut size={18} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
