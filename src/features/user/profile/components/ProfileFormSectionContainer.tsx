import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface ProfileFormSectionContainerProps extends PropsWithChildren {
  className?: string;
}

const ProfileFormSectionContainer = ({
  children,
  className,
}: ProfileFormSectionContainerProps) => {
  return <div className={cn("grid gap-4", className)}>{children}</div>;
};

export default ProfileFormSectionContainer;
