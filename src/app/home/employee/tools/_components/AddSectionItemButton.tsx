"use client";
import { Button } from "@/components/ui/button";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type {
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
import { getFieldInsertTemplate } from "@/server/utils/document.service.utils";
import { api } from "@/trpc/react";
import { PlusIcon } from "lucide-react";

type AddSectionItemButtonProps = {
  sectionId: Section["id"];
  templateOption: INTERNAL_SECTION_TAG;
  label: string;
};

const AddSectionItemButton = ({
  sectionId,
  templateOption,
  label,
}: AddSectionItemButtonProps) => {
  const sectionFields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === sectionId),
  );
  const addField = useDocumentBuilderStore((state) => state.addField);
  const addFieldValue = useDocumentBuilderStore((state) => state.addFieldValue);
  const fieldsToInsert = getFieldInsertTemplate(sectionId, templateOption);

  const { mutate: addFields, isPending } =
    api.document.addFieldsWithValues.useMutation({
      onSuccess({ fieldInsertIds, fieldValueInsertIds }) {
        const fieldsWithId = fieldsToInsert.map((field, index) => ({
          ...field,
          id: fieldInsertIds[index] as SectionField["id"],
        }));
        const fieldValues: SectionFieldValue[] = fieldsWithId.map(
          (field, index) => ({
            id: fieldValueInsertIds[index] as SectionFieldValue["id"],
            fieldId: field.id,
            value: "",
          }),
        );
        for (const field of fieldsWithId) {
          addField(field);
        }
        for (const fieldValue of fieldValues) {
          addFieldValue(fieldValue);
        }
      },
    });

  const handleAddItem = () => {
    const availableFieldDisplayOrder = sectionFields.reduce(
      (max, field) => Math.max(max, field.displayOrder),
      0,
    );
    const mappedFieldsToInsert = fieldsToInsert.map((field, index) => ({
      ...field,
      displayOrder: availableFieldDisplayOrder + index + 1,
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
      <PlusIcon /> {label}
    </Button>
  );
};

export default AddSectionItemButton;
