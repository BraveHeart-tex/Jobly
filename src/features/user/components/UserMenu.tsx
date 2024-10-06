"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/features/auth/utils";
import type { CtxUserAttributes } from "@/lib/auth";
import { EMPLOYER_ROUTES, SHARED_ROUTES } from "@/lib/routes";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

interface UserMenuProps {
  user: CtxUserAttributes;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useCurrentUserStore((state) => state.setUser);

  const userMenuProfileLinks = [
    {
      title: "Profile",
      // TODO: users will be able set their own profile slugs
      href: SHARED_ROUTES.EDIT_PROFILE,
      icon: UserIcon,
    },
    {
      title: "Privacy Settings",
      href: SHARED_ROUTES.PRIVACY_SETTINGS,
      icon: LockIcon,
    },
  ];

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    if (!user.hasToSetupCompanyInformation) return;

    const redirectPath = `${EMPLOYER_ROUTES.COMPANY_PROFILE}`;

    if (pathname === redirectPath) return;

    router.push(redirectPath);
  }, [pathname, user, router]);

  const handleSignOut = () => {
    signOut({ role: user.role, userId: user.id });
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
          <DropdownMenuLabel>Account</DropdownMenuLabel>
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
