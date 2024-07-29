import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { JobTrackerApplication } from "@/server/db/schema";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";

interface JobCardProps {
  job: JobTrackerApplication;
  isOverlay?: boolean;
}

export type JobType = "Job";

export interface TaskDragData {
  type: JobType;
  job: JobTrackerApplication;
}

export function JobCard({ job, isOverlay }: JobCardProps) {
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

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
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
        {job.jobTitle}
      </CardContent>
    </Card>
  );
}
