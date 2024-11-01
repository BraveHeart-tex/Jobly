"use client";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import AvatarEditorDialog from "@/features/user/profile/components/dialogs/AvatarEditorDialog";
import UserAvatarDialog from "@/features/user/profile/components/dialogs/UserAvatarDialog";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { EditIcon } from "lucide-react";

const AvatarSettings = () => {
  const userFullName = useCurrentUserStore(
    (state) => `${state.user?.firstName} ${state.user?.lastName}`,
  );
  return (
    <div className="group relative">
      <UserAvatarDialog
        trigger={<UserAvatar className="w-32 h-32 cursor-pointer" />}
        userFullName={userFullName}
      />
      <AvatarEditorDialog
        trigger={
          <Button
            size="smallIcon"
            variant="secondary"
            className="absolute lg:opacity-0 top-0 right-0 group-hover:opacity-100 lg:transition-opacity lg:duration-300"
          >
            <EditIcon size={16} />
          </Button>
        }
      />
    </div>
  );
};
export default AvatarSettings;
