import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { SectionField } from "@/server/db/schema";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const useSwapGroupDisplayOrder = (groupedFields: SectionField[][]) => {
  const allFields = useDocumentBuilderStore((state) => state.fields);
  const setFields = useDocumentBuilderStore((state) => state.setFields);
  const callSaveDocumentDetailsFn = useDocumentBuilderStore(
    (state) => state.callSaveDocumentDetailsFn,
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over?.id || !active.id || over.id === active.id) return;

    const activeGroupIndex = Number.parseInt(
      (active.id as string).split("-")[1] as string,
    );
    const overGroupIndex = Number.parseInt(
      (over.id as string).split("-")[1] as string,
    );

    const overGroup = groupedFields[overGroupIndex] as SectionField[];

    const newGroupFields = arrayMove(
      groupedFields,
      activeGroupIndex,
      overGroupIndex,
    ).flatMap((group, groupIndex) => {
      return group.map((field, index) => {
        return {
          ...field,
          displayOrder: index + 1 + groupIndex * overGroup.length,
        };
      });
    });

    setFields(
      allFields
        .map((field) => {
          const tempItem = newGroupFields.find((item) => item.id === field.id);
          if (tempItem) {
            return tempItem;
          }
          return field;
        })
        .sort((a, b) => a.displayOrder - b.displayOrder),
    );

    callSaveDocumentDetailsFn({
      fields: newGroupFields,
    });
  };

  return { handleDragEnd };
};
