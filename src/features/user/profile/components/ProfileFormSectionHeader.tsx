interface ProfileFormSectionHeaderProps {
  title: string;
  description: string;
}

const ProfileFormSectionHeader = ({
  title,
  description,
}: ProfileFormSectionHeaderProps) => {
  return (
    <div className="space-y-2">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  );
};

export default ProfileFormSectionHeader;
