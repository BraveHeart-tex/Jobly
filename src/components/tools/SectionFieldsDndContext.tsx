"use client";
import type { FIELD_DND_INDEX_PREFIX } from "@/lib/constants";

import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type React from "react";
import { useSwapGroupDisplayOrder } from "../../hooks/useSwapGroupDisplayOrder";

interface SectionFieldsDndContextProps {
  children: React.ReactNode;
  groupedFields: DocumentSectionField[][];
  indexPrefix: FIELD_DND_INDEX_PREFIX;
}

const SectionFieldsDndContext = ({
  children,
  groupedFields,
  indexPrefix,
}: SectionFieldsDndContextProps) => {
  const { handleDragEnd } = useSwapGroupDisplayOrder(groupedFields);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={groupedFields.map((_, index) => `${indexPrefix}-${index}`)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SectionFieldsDndContext;
