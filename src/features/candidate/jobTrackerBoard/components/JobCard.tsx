"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { useJobTrackerBoardStore } from "@/lib/stores/useJobTrackerBoardStore";
import type { JobTrackerApplication } from "@/server/db/schema/jobTrackerApplications";
import { api } from "@/trpc/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TaskDragData } from "../types";
import { useUpdateDisplayOrderByStatus } from "../hooks/useUpdateDisplayOrderByStatus";
import JobTrackerApplicationForm from "./JobTrackerApplicationForm";

interface JobCardProps {
  job: JobTrackerApplication;
  isOverlay?: boolean;
}

export function JobCard({ job, isOverlay }: JobCardProps) {
  const { updateDisplayOrderByStatus } = useUpdateDisplayOrderByStatus();
  const [isOpen, setIsOpen] = useState(false);
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const trackedApplications = useJobTrackerBoardStore(
    (state) => state.trackedApplications,
  );
  const setTrackedApplications = useJobTrackerBoardStore(
    (state) => state.setTrackedApplications,
  );

  const { mutate: deleteJobTrackerApplication, isPending } =
    api.jobTracker.deleteById.useMutation({
      onMutate: () => {
        setIsOpen(false);
        const previousTrackedApplications = trackedApplications;

        updateDisplayOrderByStatus(
          previousTrackedApplications.filter(
            (application) => application.id !== job.id,
          ),
        );

        toast.success("Job application removed successfully.");
        return { previousTrackedApplications };
      },
      onError: (_err, _newJob, context) => {
        toast.error("Something went wrong, please try again later");
        setTrackedApplications(context?.previousTrackedApplications || []);
      },
      onSettled: () => {
        setIsOpen(false);
      },
    });

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    data: {
      type: "Job",
      job,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Job",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("cursor-pointer", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  const handleApplicationDelete = () => {
    showConfirmDialog({
      title: "Are you sure you want to delete this job application?",
      message: "This action cannot be undone.",
      primaryActionLabel: "Yes",
      onConfirm: () => {
        deleteJobTrackerApplication({
          id: job.id,
        });
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Card
          ref={setNodeRef}
          style={style}
          className={variants({
            dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
          })}
        >
          <CardHeader className="px-3 py-3 lg:py-1 space-between flex flex-row border-b-2 border-secondary relative">
            <Button
              variant={"ghost"}
              {...attributes}
              {...listeners}
              className="p-1 -ml-2 h-auto cursor-grab"
            >
              <span className="sr-only">Move job application</span>
              <GripVertical />
            </Button>
          </CardHeader>
          <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{job.jobTitle}</span>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent
        className="min-w-full lg:min-w-[30%] lg:w-[1000px]"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 justify-center lg:justify-start">
            {job.jobTitle}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleApplicationDelete}
                    disabled={isPending}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete application</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTitle>
          <SheetDescription>
            Use the form below to edit the job application details
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <JobTrackerApplicationForm
            defaultValues={job}
            onFormSubmit={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
