import type { DocumentSectionFieldInsertModel } from "@/server/db/schema/documentSectionFields";
import { api } from "@/trpc/react";

export const useAddFieldsWithValues = (options: {
  onSuccess?: (
    {
      fieldInsertIds,
      fieldValueInsertIds,
    }: {
      fieldInsertIds: number[];
      fieldValueInsertIds: number[];
    },
    {
      fields,
    }: {
      fields: DocumentSectionFieldInsertModel[];
    },
  ) => void;
}) => {
  const { mutate: addFields, isPending } =
    api.document.addFieldsWithValues.useMutation(options);

  return { addFields, isPending };
};
