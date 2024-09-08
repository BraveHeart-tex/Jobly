import type { Active, DataRef, Over } from "@dnd-kit/core";
import type { ColumnDragData } from "./components/BoardColumn";
import type { TaskDragData } from "./types";

type DraggableData = ColumnDragData | TaskDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Job" || data?.type === "Column") {
    return true;
  }

  return false;
}
