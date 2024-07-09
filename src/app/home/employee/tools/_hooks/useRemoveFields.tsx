"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { SectionField } from "@/server/db/schema";
import { api } from "@/trpc/react";

export const useRemoveFields = () => {
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
    removeFieldsFromDB({ fieldIds });
  };

  return { removeFields, isDeleting };
};
