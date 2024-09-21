import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface ProfileFormDialogProps {
  trigger?: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

const ProfileFormDialog = ({
  trigger,
  title,
  description,
  children,
}: ProfileFormDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileFormDialog;
