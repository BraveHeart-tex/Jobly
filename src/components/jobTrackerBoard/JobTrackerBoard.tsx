"use client";
import {
  type ColumnId,
  useJobTrackerBoardStore,
} from "@/lib/stores/useJobTrackerBoardStore";
import type { JobTrackerApplication } from "@/server/db/schema";
import {
  type Announcements,
  DndContext,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import type { Column } from "./BoardColumn";
import { JobCard } from "./JobCard";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { hasDraggableData } from "./utils";

type JobTrackerApplicationsBoardProps = {
  data: JobTrackerApplication[];
};

export function JobTrackerApplicationsBoard({
  data,
}: JobTrackerApplicationsBoardProps) {
  const columns = useJobTrackerBoardStore((state) => state.columns);
  const setColumns = useJobTrackerBoardStore((state) => state.setColumns);

  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [trackedApplications, setTrackedApplications] =
    useState<JobTrackerApplication[]>(data);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeJob, setActiveJob] = useState<JobTrackerApplication | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  function getDraggingApplicationData(
    jobId: UniqueIdentifier,
    columnId: ColumnId,
  ) {
    const jobsInColumn = trackedApplications.filter(
      (job) => job.status === columnId,
    );
    const jobPosition = jobsInColumn.findIndex((job) => job.id === jobId);
    const column = columns.find((col) => col.id === columnId);
    return {
      jobsInColumn,
      jobPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;

      if (active.data.current?.type === "Job") {
        pickedUpTaskColumn.current = active.data.current.job.status;
        const { jobsInColumn, jobPosition, column } =
          getDraggingApplicationData(active.id, pickedUpTaskColumn.current);
        return `Picked up Job application ${
          active.data.current.job.jobTitle
        } at position: ${jobPosition + 1} of ${
          jobsInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      }
      if (
        active.data.current?.type === "Job" &&
        over.data.current?.type === "Job"
      ) {
        const { jobsInColumn, jobPosition, column } =
          getDraggingApplicationData(over.id, over.data.current.job.status);
        if (over.data.current.job.status !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.job.jobTitle
          } was moved over column ${column?.title} in position ${
            jobPosition + 1
          } of ${jobsInColumn.length}`;
        }
        return `Task was moved over position ${jobPosition + 1} of ${
          jobsInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      }
      if (
        active.data.current?.type === "Job" &&
        over.data.current?.type === "Job"
      ) {
        const { jobsInColumn, jobPosition, column } =
          getDraggingApplicationData(over.id, over.data.current.job.status);
        if (over.data.current.job.status !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            jobPosition + 1
          } of ${jobsInColumn.length}`;
        }
        return `Task was dropped into position ${jobPosition + 1} of ${
          jobsInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              jobs={trackedApplications.filter((job) => job.status === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <BoardColumn
              isOverlay
              column={activeColumn}
              jobs={trackedApplications.filter(
                (job) => job.status === activeColumn.id,
              )}
            />
          )}
          {activeJob && <JobCard job={activeJob} isOverlay />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    if (data?.type === "Job") {
      setActiveJob(data.job);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAJob = activeData?.type === "Job";
    const isOverAJob = overData?.type === "Job";

    if (!isActiveAJob) return;

    if (isActiveAJob && isOverAJob) {
      setTimeout(() => {
        setTrackedApplications((applications) => {
          const activeIndex = applications.findIndex((t) => t.id === activeId);
          const overIndex = applications.findIndex((t) => t.id === overId);
          const activeApplication = applications[activeIndex];
          const overApplication = applications[overIndex];
          if (
            activeApplication &&
            overApplication &&
            activeApplication.status !== overApplication.status
          ) {
            activeApplication.status = overApplication.status;
            return arrayMove(applications, activeIndex, overIndex - 1);
          }

          return arrayMove(applications, activeIndex, overIndex);
        });
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveAJob && isOverAColumn) {
      setTimeout(() => {
        setTrackedApplications((applications) => {
          const activeIndex = applications.findIndex((t) => t.id === activeId);
          const activeTask = applications[activeIndex];
          if (activeTask) {
            activeTask.status = overId as ColumnId;
            return arrayMove(applications, activeIndex, activeIndex);
          }
          return applications;
        });
      });
    }
  }
}
