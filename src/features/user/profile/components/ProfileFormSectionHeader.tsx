interface ProfileFormSectionHeaderProps {
  title: string;
  description: string;
}

const ProfileFormSectionHeader = ({
  title,
  description,
}: ProfileFormSectionHeaderProps) => {
  return (
    <div className="grid gap-2">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default ProfileFormSectionHeader;
