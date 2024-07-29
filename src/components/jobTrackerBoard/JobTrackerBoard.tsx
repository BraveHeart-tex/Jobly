"use client";
import { useUpdateDisplayOrderByStatus } from "@/components/jobTrackerBoard/hooks/useUpdateDisplayOrderByStatus";
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
import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import { JobCard } from "./JobCard";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { hasDraggableData } from "./utils";

type JobTrackerApplicationsBoardProps = {
  data: JobTrackerApplication[];
};

export function JobTrackerApplicationsBoard({
  data,
}: JobTrackerApplicationsBoardProps) {
  const { updateDisplayOrderByStatus } = useUpdateDisplayOrderByStatus();
  const columns = useJobTrackerBoardStore((state) => state.columns);
  const trackedApplications = useJobTrackerBoardStore(
    (state) => state.trackedApplications,
  );
  const setTrackedApplications = useJobTrackerBoardStore(
    (state) => state.setTrackedApplications,
  );
  const activeJob = useJobTrackerBoardStore((state) => state.activeJob);
  const setActiveJob = useJobTrackerBoardStore((state) => state.setActiveJob);

  const pickedUpApplicationColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    setTrackedApplications(data);
  }, [data, setTrackedApplications]);

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
        pickedUpApplicationColumn.current = active.data.current.job.status;
        const { jobsInColumn, jobPosition, column } =
          getDraggingApplicationData(
            active.id,
            pickedUpApplicationColumn.current,
          );
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
        if (
          over.data.current.job.status !== pickedUpApplicationColumn.current
        ) {
          return `Job Application ${
            active.data.current.job.jobTitle
          } was moved over column ${column?.title} in position ${
            jobPosition + 1
          } of ${jobsInColumn.length}`;
        }
        return `Job Application was moved over position ${jobPosition + 1} of ${
          jobsInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpApplicationColumn.current = null;
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
        if (
          over.data.current.job.status !== pickedUpApplicationColumn.current
        ) {
          return `Job Application was dropped into column ${column?.title} in position ${
            jobPosition + 1
          } of ${jobsInColumn.length}`;
        }
        return `Job Application was dropped into position ${jobPosition + 1} of ${
          jobsInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpApplicationColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpApplicationColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  const onDragEnd = () => {
    const tmpTrackedApplications = [...trackedApplications];
    updateDisplayOrderByStatus(tmpTrackedApplications);
  };

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
            return arrayMove(applications, activeIndex, overIndex - 1).map(
              (item, index) => ({
                ...item,
                displayOrder: index + 1,
              }),
            );
          }

          return arrayMove(applications, activeIndex, overIndex).map(
            (item, index) => ({
              ...item,
              displayOrder: index + 1,
            }),
          );
        });
      });
    }

    const isOverAColumn = overData?.type === "Column";

    if (isActiveAJob && isOverAColumn) {
      setTimeout(() => {
        setTrackedApplications((applications) => {
          const activeIndex = applications.findIndex((t) => t.id === activeId);
          const activeApplication = applications[activeIndex];
          if (activeApplication) {
            activeApplication.status = overId as ColumnId;
            return arrayMove(applications, activeIndex, activeIndex);
          }
          return applications;
        });
      });
    }
  }

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              jobs={trackedApplications
                .filter((job) => job.status === col.id)
                .sort((a, b) => a.displayOrder - b.displayOrder)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {createPortal(
        <DragOverlay>
          {activeJob && <JobCard job={activeJob} isOverlay />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
