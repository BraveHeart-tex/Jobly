"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGenericConfirm } from "@/app/contexts/GenericConfirmContext";
import { useTransition } from "react";

const GenericConfirmDialog = () => {
  let [isPending, startTransition] = useTransition();
  const { visible, cleanUp, title, message, customElement, primaryActionLabel, callPrimaryAction } =
    useGenericConfirm();

  return (
    <AlertDialog open={visible}>
      <AlertDialogContent onEscapeKeyDown={cleanUp}>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle className="text-facebook dark:text-gray-200">{title} </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
          {customElement}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cleanUp}>Cancel</AlertDialogCancel>
          {primaryActionLabel && (
            <AlertDialogAction
              className="bg-facebook hover:bg-facebook-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
              onClick={() => {
                startTransition(async () => {
                  await callPrimaryAction();
                });
              }}
            >
              {primaryActionLabel}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GenericConfirmDialog;
