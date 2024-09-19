"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";

const mapItemDisplayOrderByIndex = (
  item: DocumentSectionField,
  index: number,
) => ({
  ...item,
  displayOrder: index + 1,
});

export const useUpdateFieldDisplayOrdersOnDelete = () => {
  const allFields = useDocumentBuilderStore((state) => state.fields);
  const setFields = useDocumentBuilderStore((state) => state.setFields);
  const callSaveDocumentDetailsFn = useDocumentBuilderStore(
    (state) => state.callSaveDocumentDetailsFn,
  );

  const updateFieldOrdersOnDelete = (
    sectionId: DocumentSection["id"],
    deletedFieldIds: DocumentSectionField["id"][],
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
