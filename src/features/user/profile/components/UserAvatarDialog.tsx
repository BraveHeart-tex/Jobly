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
import { CameraIcon, InfoIcon, PencilIcon, TrashIcon } from "lucide-react";
import AvatarEditorDialog from "@/features/user/profile/components/AvatarEditorDialog";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";

const UserAvatarDialog = () => {
  const userAvatarUrl = useCurrentUserStore((state) => state.user?.avatarUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="cursor-pointer absolute bottom-0 left-6 transform translate-y-1/3 w-[9.5rem] h-[9.5rem] rounded-full">
          <AvatarImage src="/default-avatar.svg" alt="Profile picture" />
          <AvatarFallback className="text-lg">BK</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Your Profile Picture</DialogTitle>
        </DialogHeader>
        <div>
          <Image
            src="/default-avatar.svg"
            width={200}
            height={200}
            alt="avatar"
            className="w-[250px] h-[250px] object-cover mx-auto"
          />
        </div>

        <div className="flex items-center gap-1 px-4">
          <InfoIcon size={22} />
          <span className="text-sm">Your profile picture is public.</span>
        </div>
        <div className="w-full flex items-center justify-between px-4 border-t">
          <div className="flex items-center gap-1 h-full">
            <AvatarEditorDialog
              trigger={
                <Button variant="ghost" className="flex flex-col gap-1 h-full">
                  <PencilIcon size={22} />
                  <span>Edit</span>
                </Button>
              }
            />
            <Button variant="ghost" className="flex flex-col gap-1 h-full">
              <CameraIcon size={22} />
              <span>Add Picture</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            className="flex flex-col gap-1 h-full"
            disabled={!userAvatarUrl}
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
