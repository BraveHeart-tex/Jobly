"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section } from "@/server/db/schema";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ReactNode } from "react";

type SectionsDndContextProps = {
  children: ReactNode;
};

const SectionsDndContext = ({ children }: SectionsDndContextProps) => {
  const sections = useDocumentBuilderStore((state) => state.sections);
  const setSections = useDocumentBuilderStore((state) => state.setSections);

  const getSectionIndexById = (id: Section["id"]) =>
    sections.findIndex((section) => section.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over?.id || !active.id || over.id === active.id) return;
    const activeSectionIndex = getSectionIndexById(active.id as number);
    const overSectionIndex = getSectionIndexById(over.id as number);

    const mappedSections = arrayMove(
      sections,
      activeSectionIndex,
      overSectionIndex,
    ).map((section, index) => ({
      ...section,
      displayOrder: index + 1,
    }));

    setSections(mappedSections);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default SectionsDndContext;
