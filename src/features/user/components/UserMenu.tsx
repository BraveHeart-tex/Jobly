"use client";

import type { GetCurrentUserReturnType } from "@/actions/auth";
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
import { DEFAULT_AVATAR_URL } from "@/lib/constants";
import { EMPLOYER_ROUTES, SHARED_ROUTES } from "@/lib/routes";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BuildingIcon, KeyRoundIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

interface UserMenuProps {
  user: GetCurrentUserReturnType;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const userAvatarUrl =
    useCurrentUserStore((state) => state.user?.avatarUrl) || DEFAULT_AVATAR_URL;
  const pathname = usePathname();
  const router = useRouter();
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

  useEffect(() => {
    if (!user.hasToSetupCompanyInformation) return;

    const redirectPath = `${EMPLOYER_ROUTES.COMPANY_PROFILE}`;

    if (pathname === redirectPath) return;

    router.push(redirectPath);
  }, [pathname, user, router]);

  const handleSignOut = () => {
    signOut(user.role);
    setUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userAvatarUrl} />
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
