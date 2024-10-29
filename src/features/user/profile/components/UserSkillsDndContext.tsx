"use client";

import type { OrderedUserSkill } from "@/features/user/profile/types";
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

interface UserSkillsDndContextProps {
  userSkills: OrderedUserSkill[];
  setUserSkills: (highlightedSkills: OrderedUserSkill[]) => void;
}

const UserSkillsDndContext = ({
  children,
  userSkills,
  setUserSkills,
}: PropsWithChildren<UserSkillsDndContextProps>) => {
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

    const activeIndex = userSkills.findIndex(
      (userSkill) => userSkill.id === active.id,
    );
    const overIndex = userSkills.findIndex(
      (userSkill) => userSkill.id === over.id,
    );

    setUserSkills(arrayMove(userSkills, activeIndex, overIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={userSkills}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default UserSkillsDndContext;
