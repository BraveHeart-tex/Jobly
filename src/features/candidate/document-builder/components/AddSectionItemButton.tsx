"use client";
import { Button } from "@/components/ui/button";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionFieldValue } from "@/server/db/schema/documentSectionFieldValues";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { Loader2, PlusIcon } from "lucide-react";
import { getFieldInsertTemplateBySectionTag } from "@/features/candidate/documents/utils";
import { useAddFieldsWithValues } from "@/features/candidate/document-builder/hooks/useAddFieldsWithValues";
import { useShallow } from "zustand/react/shallow";

interface AddSectionItemButtonProps {
  sectionId: DocumentSection["id"];
  templateOption: INTERNAL_SECTION_TAG;
  label: string;
}

const AddSectionItemButton = ({
  sectionId,
  templateOption,
  label,
}: AddSectionItemButtonProps) => {
  const sectionFields = useDocumentBuilderStore(
    useShallow((state) =>
      state.fields.filter((field) => field.sectionId === sectionId),
    ),
  );
  const addField = useDocumentBuilderStore((state) => state.addField);
  const addFieldValue = useDocumentBuilderStore((state) => state.addFieldValue);

  const { addFields, isPending } = useAddFieldsWithValues({
    onSuccess({ fieldInsertIds, fieldValueInsertIds }, { fields }) {
      const mappedFields = fields.map((item, index) => ({
        ...item,
        id: fieldInsertIds[index] as DocumentSectionFieldValue["id"],
      }));

      const fieldValues = mappedFields.map((field, index) => ({
        id: fieldValueInsertIds[index] as DocumentSectionFieldValue["id"],
        fieldId: field.id,
        value: "",
      }));

      for (const field of mappedFields) {
        addField(field);
      }
      for (const fieldValue of fieldValues) {
        addFieldValue(fieldValue);
      }
    },
  });

  const getFinalDisplayOrder = () => {
    return sectionFields.reduce(
      (max, field) => Math.max(max, field.displayOrder),
      0,
    );
  };

  const handleAddItem = () => {
    const fieldsToInsert = getFieldInsertTemplateBySectionTag(
      sectionId,
      templateOption,
    );
    const finalOrder = getFinalDisplayOrder();

    const mappedFieldsToInsert = fieldsToInsert.map((field, index) => ({
      ...field,
      displayOrder: finalOrder + index + 1,
    }));

    addFields({
      fields: mappedFieldsToInsert,
    });
  };

  return (
    <Button
      className="flex items-center gap-1 w-full hover:text-primary justify-start"
      variant="ghost"
      disabled={isPending}
      onClick={handleAddItem}
    >
      {!isPending ? (
        <>
          <PlusIcon /> {label}
        </>
      ) : (
        <>
          <Loader2 className="animate-spin" /> <p>Adding...</p>
        </>
      )}
    </Button>
  );
};

export default AddSectionItemButton;
