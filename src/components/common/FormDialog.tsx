import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import type React from "react";
import { Loader2 } from "lucide-react";

interface FormDialogProps {
  title: string;
  isCloseDisabled?: boolean;
  isSaveDisabled?: boolean;
  isLoadingInitialData?: boolean;
  onSave: () => void;
  onClose?: () => void | Promise<void>;
  onDeleteClick?: () => void;
  deleteLabel?: string;
  children: React.ReactNode;
}

const FormDialog = ({
  title,
  isCloseDisabled,
  isSaveDisabled,
  isLoadingInitialData = false,
  onSave,
  onClose = () => {},
  onDeleteClick,
  deleteLabel,
  children,
}: FormDialogProps) => {
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={async (isOpen) => {
        if (!isOpen) {
          await onClose();
        }
      }}
    >
      <DialogContent className="max-h-[98%] overflow-hidden px-0 w-full lg:min-w-[42.5rem]">
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingInitialData ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin text-primary" size={32} />
                <span className="font-medium text-2xl">Loading...</span>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
        <DialogFooter className="px-6 gap-1 lg:gap-0">
          {onDeleteClick && (
            <Button
              variant="destructive"
              onClick={onDeleteClick}
              disabled={isSaveDisabled}
              className="w-max mr-auto"
            >
              {deleteLabel || "Delete"}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="secondary" disabled={isCloseDisabled}>
              Close
            </Button>
          </DialogClose>
          <Button onClick={onSave} disabled={isSaveDisabled}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
