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
}

const AvatarEditorDialog = ({ trigger }: AvatarEditorDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Profile Picture</DialogTitle>
        </DialogHeader>
        <AvatarEditor
          onSave={(canvas) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
              }
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AvatarEditorDialog;
