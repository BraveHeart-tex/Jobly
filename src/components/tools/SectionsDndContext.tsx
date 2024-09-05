"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSection } from "@/server/db/schema/documentSections";
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
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ReactNode } from "react";

interface SectionsDndContextProps {
  children: ReactNode;
}

const SectionsDndContext = ({ children }: SectionsDndContextProps) => {
  const sections = useDocumentBuilderStore((state) => state.sections);
  const setSections = useDocumentBuilderStore((state) => state.setSections);

  const getSectionIndexById = (id: DocumentSection["id"]) =>
    sections.findIndex((section) => section.id === id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default SectionsDndContext;
