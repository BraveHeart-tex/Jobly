"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CameraIcon, InfoIcon, TrashIcon } from "lucide-react";
import AvatarEditorDialog from "@/features/user/profile/components/AvatarEditorDialog";
import { DEFAULT_AVATAR_URL } from "@/lib/constants";
import { getAvatarPlaceholder } from "@/lib/utils/string";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { useDeleteUserAvatar } from "@/features/user/profile/hooks/useDeleteUserAvatar";
import { showSuccessToast } from "@/components/toastUtils";

interface UserAvatarDialogProps {
  userFullName: string;
}

const UserAvatarDialog = ({ userFullName }: UserAvatarDialogProps) => {
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const userAvatarUrl = useCurrentUserStore((state) => state.user?.avatarUrl);
  const updateAvatarUrl = useCurrentUserStore((state) => state.updateAvatarUrl);

  const { deleteUserAvatar, isDeletingUserAvatar } = useDeleteUserAvatar({
    onSuccess: () => {
      showSuccessToast("Profile picture deleted successfully.");
      updateAvatarUrl(null);
    },
  });

  const handleDeleteAvatarClick = () => {
    showConfirmDialog({
      title: "Are you sure you want to delete your profile picture?",
      message: "This action cannot be undone.",
      primaryActionLabel: "Delete",
      onConfirm: () => {
        deleteUserAvatar();
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="cursor-pointer absolute bottom-0 left-6 transform translate-y-1/3 w-[9.5rem] h-[9.5rem] rounded-full border-primary-foreground border-4">
          <AvatarImage
            src={userAvatarUrl || DEFAULT_AVATAR_URL}
            alt={
              userAvatarUrl
                ? `Profile picture for ${userFullName}`
                : "Default profile picture"
            }
          />
          <AvatarFallback className="text-2xl font-bold">
            {getAvatarPlaceholder(userFullName)}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Your Profile Picture</DialogTitle>
        </DialogHeader>
        <div>
          <Image
            src={userAvatarUrl || DEFAULT_AVATAR_URL}
            width={200}
            height={200}
            alt={
              userAvatarUrl
                ? `Profile picture for ${userFullName}`
                : "Default profile picture"
            }
            className="w-[250px] h-[250px] object-cover mx-auto"
          />
        </div>

        {userAvatarUrl && (
          <div className="flex items-center gap-1 px-4">
            <InfoIcon size={22} />
            <span className="text-sm">Your profile picture is public.</span>
          </div>
        )}
        <div className="w-full flex items-center justify-end px-4 border-t">
          <AvatarEditorDialog
            trigger={
              <Button
                variant="ghost"
                className="flex flex-col gap-1 h-full rounded-none"
                disabled={isDeletingUserAvatar}
              >
                <CameraIcon size={22} />
                <span>New Picture</span>
              </Button>
            }
          />
          <Button
            variant="ghost"
            className="flex flex-col gap-1 h-full rounded-none"
            disabled={!userAvatarUrl || isDeletingUserAvatar}
            onClick={handleDeleteAvatarClick}
          >
            <TrashIcon size={22} />
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UserAvatarDialog;
