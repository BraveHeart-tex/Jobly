"use client";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  type SortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { PropsWithChildren } from "react";

interface SortableItemType {
  id: string | number;
}

interface SortableDndContextProps<T extends SortableItemType> {
  items: T[];
  setItems: (items: T[]) => void;
  strategy?: SortingStrategy;
}

const SortableDndContext = <T extends SortableItemType>({
  children,
  items,
  setItems,
  strategy = verticalListSortingStrategy,
}: PropsWithChildren<SortableDndContextProps<T>>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active || over.id === active.id) return;

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return; // Extra safety check

    setItems(arrayMove(items, activeIndex, overIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={strategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableDndContext;
