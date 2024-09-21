import type { ReactNode } from "react";

interface ProfileFormSectionHeaderProps {
  title: string;
  description: string;
  headerActionElement?: ReactNode;
}

const ProfileFormSectionHeader = ({
  title,
  description,
  headerActionElement,
}: ProfileFormSectionHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between w-full">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {headerActionElement}
      </div>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  );
};

export default ProfileFormSectionHeader;
