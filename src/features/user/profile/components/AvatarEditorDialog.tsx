"use client";
import AvatarEditor from "@/components/common/AvatarEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type React from "react";

interface AvatarEditorDialogProps {
  trigger: React.ReactNode;
  onSave: (canvas: HTMLCanvasElement) => void;
}

const AvatarEditorDialog = ({ trigger, onSave }: AvatarEditorDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Profile Picture</DialogTitle>
        </DialogHeader>
        <AvatarEditor onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
};

export default AvatarEditorDialog;
