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
import { useState } from "react";

interface AvatarEditorDialogProps {
  trigger: React.ReactNode;
  onSave: (canvas: HTMLCanvasElement) => void;
}

const AvatarEditorDialog = ({ trigger }: AvatarEditorDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Profile Picture</DialogTitle>
        </DialogHeader>
        <AvatarEditor onSaveSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AvatarEditorDialog;
