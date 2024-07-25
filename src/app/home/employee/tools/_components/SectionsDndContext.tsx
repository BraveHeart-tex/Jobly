"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ReactNode } from "react";

type SectionsDndContextProps = {
  children: ReactNode;
};

const SectionsDndContext = ({ children }: SectionsDndContextProps) => {
  const sections = useDocumentBuilderStore((state) => state.sections);

  const handleDragEnd = () => {};

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default SectionsDndContext;
