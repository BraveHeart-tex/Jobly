import { JOB_TRACKER_COLUMN_TO_ICON_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type {
  JobTrackerApplication,
  JobTrackerApplicationStatus,
} from "@/server/db/schema";
import { type UniqueIdentifier, useDndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { type ReactNode, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { JobCard } from "./JobCard";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import JobTrackerApplicationForm from "../forms/JobTrackerApplicationForm";

export interface Column {
  id: JobTrackerApplicationStatus;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  jobs: JobTrackerApplication[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, jobs, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return jobs.map((jobs) => jobs.id);
  }, [jobs]);

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id as UniqueIdentifier,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-[calc(100vh-250px)] max-h-[calc(100vh-250px)] w-[300px] max-w-full flex flex-col flex-shrink-0 snap-center overflow-hidden",
    {
      variants: {
        dragging: {
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  const ColumnIcon = JOB_TRACKER_COLUMN_TO_ICON_MAP[column.id];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader
        className={cn(
          "p-4 font-semibold rounded-md rounded-b-none",
          column.id === "applied" && "bg-amber-50 dark:bg-amber-900",
          column.id === "shortlist" && "bg-blue-50 dark:bg-blue-900",
          column.id === "interview" && "bg-violet-50 dark:bg-violet-900",
          column.id === "offer" && "bg-green-50 dark:bg-green-900",
          column.id === "rejected" && "bg-red-50 dark:bg-red-900",
        )}
      >
        <span className="flex items-center gap-2">
          {<ColumnIcon size={20} />}
          {column.title}
        </span>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
      <CardFooter className="p-0 mt-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="w-full rounded-t-none flex items-center gap-1"
              variant="secondary"
            >
              <PlusIcon size={17} />
              Add Job
            </Button>
          </SheetTrigger>
          <SheetContent className="min-w-full lg:min-w-[600px]">
            <SheetHeader>
              <SheetTitle>Add Job Application</SheetTitle>
              <SheetDescription>
                Use the form below to add your job application to track it with
                ease!
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8">
              <JobTrackerApplicationForm
                defaultValues={{
                  status: column.id,
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}

export function BoardContainer({ children }: { children: ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-2 items-center flex-row justify-center">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
