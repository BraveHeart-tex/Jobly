import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { type UniqueIdentifier, useDndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { type ReactNode, useMemo } from "react";
import { cva } from "class-variance-authority";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { type Job, JobCard } from "./JobCard";
import AddJobTrackerDrawer from "./AddJobTrackerDrawer";
import type { JobTrackerApplicationStatus } from "@/server/db/schema";

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
  tasks: Job[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
    "h-[500px] max-h-[500px] w-[300px] max-w-full flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        <span className="ml-auto"> {column.title}</span>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <JobCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
      <CardFooter className="p-0 mt-auto">
        <AddJobTrackerDrawer status={column.id} />
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
