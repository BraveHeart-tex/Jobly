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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteGeneric } from "@/lib/generic";
import { JobApplication } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { showErrorToast, showToast } from "./ui/use-toast";
import { FaTrash } from "react-icons/fa";

interface IDeleteJobDialogProps {
  jobId: number;
}

const DeleteJobDialog = ({ jobId }: IDeleteJobDialogProps) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deleteJob = () => {
    startTransition(async () => {
      const result = await deleteGeneric<JobApplication>({
        tableName: "jobApplication",
        whereCondition: { id: jobId },
      });
      if (result?.error) {
        showErrorToast({ title: "Oops!", description: "Something went wrong. Please try again later." });
      } else {
        showToast({ title: "Success!", description: "Job deleted successfully." });
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-destructive text-gray-50 font-semibold rounded-md px-2 hover:bg-destructive/80 transition-all flex items-center gap-2">
        <FaTrash /> Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-facebook dark:text-foreground">
            Are you sure you want to delete this job application?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the job application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-foreground font-semibold">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-facebook dark:bg-primary font-semibold hover:bg-facebook-400 transition-all dark:hover:bg-primary/80"
            onClick={() => {
              deleteJob();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobDialog;
