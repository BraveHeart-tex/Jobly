"use client";

import type { SkillSelectModel } from "@/server/db/schema/skills";
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
import type { PropsWithChildren } from "react";

interface HighlightedSkillsDndContextProps {
  highlightedSkills: SkillSelectModel[];
  setHighlightedSkills: (highlightedSkills: SkillSelectModel[]) => void;
}

const HighlightedSkillsDndContext = ({
  children,
  highlightedSkills,
  setHighlightedSkills,
}: PropsWithChildren<HighlightedSkillsDndContextProps>) => {
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

    const activeIndex = highlightedSkills.findIndex(
      (skill) => skill.id === active.id,
    );
    const overIndex = highlightedSkills.findIndex(
      (skill) => skill.id === over.id,
    );

    setHighlightedSkills(arrayMove(highlightedSkills, activeIndex, overIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={highlightedSkills}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default HighlightedSkillsDndContext;
