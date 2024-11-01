import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_AVATAR_URL } from "@/lib/constants";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";

interface UserAvatarProps {
  className?: string;
}

const UserAvatar = ({ className, ...props }: UserAvatarProps) => {
  const userAvatarUrl =
    useCurrentUserStore((state) => state.user?.avatarUrl) || DEFAULT_AVATAR_URL;
  const userFirstName =
    useCurrentUserStore((state) => state.user?.firstName) || "";
  const userLastName =
    useCurrentUserStore((state) => state.user?.lastName) || "";

  return (
    <Avatar className={className} {...props}>
      <AvatarImage src={userAvatarUrl} />
      <AvatarFallback>
        {userFirstName.charAt(0) + userLastName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
