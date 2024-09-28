"use client";

import { Button } from "@/components/ui/button";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { useSortable } from "@dnd-kit/sortable";
import { GripIcon, XIcon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

interface HighlightedSkillItemProps {
  skill: SkillSelectModel;
  onRemoveClick: (id: number) => void;
  shouldShowGripIcon?: boolean;
}

const HighlightedSkillItem = ({
  skill,
  shouldShowGripIcon,
  onRemoveClick,
}: HighlightedSkillItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: skill.id });

  const handleRemoveClick = () => {
    onRemoveClick(skill.id);
  };

  return (
    <div
      className="w-full"
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
    >
      <div className="flex items-center gap-2 w-full">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleRemoveClick}
        >
          <XIcon />
        </Button>
        <p className="text-base font-semibold">{skill.name}</p>
        {shouldShowGripIcon && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-auto"
            {...listeners}
          >
            <GripIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HighlightedSkillItem;
