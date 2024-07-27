"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { mapItemDisplayOrderByIndex } from "@/lib/utils";
import type { Section, SectionField } from "@/server/db/schema";

export const useUpdateFieldDisplayOrdersOnDelete = () => {
  const allFields = useDocumentBuilderStore((state) => state.fields);
  const setFields = useDocumentBuilderStore((state) => state.setFields);
  const callSaveDocumentDetailsFn = useDocumentBuilderStore(
    (state) => state.callSaveDocumentDetailsFn,
  );

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

  return updateFieldOrdersOnDelete;
};
