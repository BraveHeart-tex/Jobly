"use client";

import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { GripIcon, XIcon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";

interface SortableItemProps<
  T extends { [K in IdField | NameField]: unknown },
  IdField extends keyof T,
  NameField extends keyof T,
> {
  item: T;
  idField: IdField;
  nameField: NameField;
  onRemoveClick: (id: T[IdField]) => void;
  shouldShowGripIcon?: boolean;
  renderContent?: (item: T) => React.ReactNode;
  className?: string;
  removeButtonClassName?: string;
  gripButtonClassName?: string;
  contentClassName?: string;
}

const SortableItem = <
  T extends { [K in IdField | NameField]: unknown },
  IdField extends keyof T,
  NameField extends keyof T,
>({
  item,
  idField,
  nameField,
  shouldShowGripIcon = true,
  onRemoveClick,
  renderContent,
  className = "w-full",
  removeButtonClassName = "",
  gripButtonClassName = "ml-auto",
  contentClassName = "text-base font-semibold",
}: SortableItemProps<T, IdField, NameField>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item[idField] as string });

  const handleRemoveClick = () => {
    onRemoveClick(item[idField] as T[IdField]);
  };

  return (
    <div
      className={className}
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
          className={removeButtonClassName}
          onClick={handleRemoveClick}
        >
          <XIcon />
        </Button>

        {renderContent ? (
          renderContent(item)
        ) : (
          <p className={contentClassName}>{item[nameField] as string}</p>
        )}

        {shouldShowGripIcon && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={gripButtonClassName}
            {...listeners}
          >
            <GripIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SortableItem;
