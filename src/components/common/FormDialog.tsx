import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ExtendedUseFormReturn } from "@/lib/hook-form/useExtendedForm";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

import type { FieldValues } from "react-hook-form";

interface FormDialogProps<T extends FieldValues = FieldValues> {
  title: string;
  isCloseDisabled?: boolean;
  isSaveDisabled?: boolean;
  isLoadingInitialData?: boolean;
  onSubmit: (values: T, ...args: unknown[]) => void;
  onClose?: () => void | Promise<void>;
  onDeleteClick?: () => void;
  deleteLabel?: string;
  children: React.ReactNode;
  isDirty?: boolean;
  form?: ExtendedUseFormReturn<T, undefined, undefined>;
}

const FormDialog = <T extends FieldValues = FieldValues>({
  title,
  isCloseDisabled,
  isSaveDisabled,
  isLoadingInitialData = false,
  onSubmit,
  onClose = () => {},
  onDeleteClick,
  deleteLabel,
  children,
  form,
  isDirty,
}: FormDialogProps<T>) => {
  const [open, setOpen] = useState(true);

  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const handleDialogClose = async () => {
    await onClose();
    setOpen(false);
  };

  const isFormDirty =
    isDirty === undefined ? form?.formState?.isDirty : isDirty;

  const handleOpenChange = async (isOpen: boolean) => {
    if (!isOpen) {
      if (isFormDirty && !isLoadingInitialData) {
        return showConfirmDialog({
          title: "Discard changes?",
          message: "Are you sure you want to discard your changes?",
          primaryActionLabel: "Discard",
          secondaryActionLabel: "Cancel",
          onDeny: () => {},
          onConfirm: async () => {
            await handleDialogClose();
          },
        });
      }

      await handleDialogClose();
    }
  };

  const handleSave = () => {
    if (!form) {
      return onSubmit({} as T);
    }
    form?.handleSubmit(onSubmit)();
  };

  return (
    <Dialog defaultOpen={true} open={open} onOpenChange={handleOpenChange}>
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
          <Button onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
