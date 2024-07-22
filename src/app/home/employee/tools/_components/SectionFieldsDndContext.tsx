"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type React from "react";
import { useSwapGroupDisplayOrder } from "../_hooks/useSwapGroupDisplayOrder";
import type { SectionField } from "@/server/db/schema";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { FIELD_DND_INDEX_PREFIX } from "@/lib/constants";

type SectionFieldsDndContextProps = {
  children: React.ReactNode;
  groupedFields: SectionField[][];
  indexPrefix: FIELD_DND_INDEX_PREFIX;
};

const SectionFieldsDndContext = ({
  children,
  groupedFields,
  indexPrefix,
}: SectionFieldsDndContextProps) => {
  const { handleDragEnd } = useSwapGroupDisplayOrder(groupedFields);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
