"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { SectionField } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { useUpdateFieldDisplayOrdersOnDelete } from "./useUpdateFieldDisplayOrdersOnDelete";

export const useRemoveFields = () => {
  const updateDisplayOrdersOnDelete = useUpdateFieldDisplayOrdersOnDelete();
  const { mutate: removeFieldsFromDB, isPending: isDeleting } =
    api.document.removeFields.useMutation({
      onMutate: ({ fieldIds }) => {
        removeFieldsFromStore(fieldIds);
      },
    });
  const removeFieldsFromStore = useDocumentBuilderStore(
    (state) => state.removeFields,
  );

  const removeFields = (fieldIds: SectionField["id"][]) => {
    const sectionId = useDocumentBuilderStore
      .getState()
      .fields.filter((field) => field.id === fieldIds[0])[0]?.sectionId;
    if (!sectionId) return;

    removeFieldsFromDB({ fieldIds });
    updateDisplayOrdersOnDelete(sectionId, fieldIds);
  };

  return { removeFields, isDeleting };
};
