import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section, SectionField } from "@/server/db/schema";
import type { DragEndEvent } from "@dnd-kit/core";

export const useSwapGroupDisplayOrder = (groupedFields: SectionField[][]) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const sectionId = groupedFields[0]![0]!.sectionId as Section["id"];
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

    const activeGroup = groupedFields[activeGroupIndex] as SectionField[];
    const overGroup = groupedFields[overGroupIndex] as SectionField[];

    if (!activeGroup || !overGroup || activeGroup.length !== overGroup.length)
      return;

    const tempActiveDisplayOrders = activeGroup.map(
      (item) => item.displayOrder,
    );

    const tempOverDisplayOrders = overGroup.map((item) => item.displayOrder);

    for (let i = 0; i < activeGroup.length; i++) {
      if (i < overGroup.length) {
        // @ts-ignore
        activeGroup[i].displayOrder = tempOverDisplayOrders[i];
      }
    }

    for (let i = 0; i < overGroup.length; i++) {
      if (i < activeGroup.length) {
        // @ts-ignore
        overGroup[i].displayOrder = tempActiveDisplayOrders[i];
      }
    }

    const updatedGroupFields = groupedFields.flatMap((group, groupIndex) => {
      if (groupIndex === activeGroupIndex) {
        return activeGroup;
      }
      if (groupIndex === overGroupIndex) {
        return overGroup;
      }
      return group;
    });

    setFields(
      allFields
        .map((field) => {
          const tempItem = updatedGroupFields.find(
            (item) => item.id === field.id,
          );
          if (tempItem) {
            return tempItem;
          }
          return field;
        })
        .sort((a, b) => a.displayOrder - b.displayOrder),
    );

    callSaveDocumentDetailsFn({
      fields: updatedGroupFields,
    });
  };

  const mapItemDisplayOrderByIndex = (item: SectionField, index: number) => ({
    ...item,
    displayOrder: index + 1,
  });

  const updateFieldOrdersOnDelete = (
    sectionId: Section["id"],
    deletedFieldIds: SectionField["id"][],
  ) => {
    const mappedSectionFields = allFields
      .filter(
        (field) =>
          field.sectionId === sectionId && !deletedFieldIds.includes(field.id),
      )
      .map(mapItemDisplayOrderByIndex);

    if (mappedSectionFields.length === 0) return;

    setFields(
      allFields
        .map((field) => {
          const foundField = mappedSectionFields.find(
            (item) => item.id === field.id,
          );
          if (foundField) {
            return foundField;
          }
          return field;
        })
        .sort((a, b) => a.displayOrder - b.displayOrder),
    );

    callSaveDocumentDetailsFn({
      fields: mappedSectionFields,
    });
  };

  return { handleDragEnd, updateFieldOrdersOnDelete };
};
