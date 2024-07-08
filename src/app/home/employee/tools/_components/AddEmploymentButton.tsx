"use client";
import { Button } from "@/components/ui/button";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type {
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
import { getFieldInsertTemplate } from "@/server/utils/document.service.utils";
import { api } from "@/trpc/react";
import { PlusIcon } from "lucide-react";

type AddEmploymentButtonProps = {
  sectionId: Section["id"];
};

const AddEmploymentButton = ({ sectionId }: AddEmploymentButtonProps) => {
  const addField = useDocumentBuilderStore((state) => state.addField);
  const addFieldValue = useDocumentBuilderStore((state) => state.addFieldValue);
  const fieldsToInsert = getFieldInsertTemplate(sectionId, "employmentHistory");

  const { mutate: addFields, isPending } =
    api.document.addFieldsWithValues.useMutation({
      onSuccess({ fieldIds, fieldValueIds }) {
        const fieldsWithId = fieldsToInsert.map((field, index) => ({
          ...field,
          id: fieldIds[index] as SectionField["id"],
        }));
        const fieldValues: SectionFieldValue[] = fieldsWithId.map(
          (field, index) => ({
            id: fieldValueIds[index] as SectionFieldValue["id"],
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

  const handleAddEmployment = () => {
    addFields({
      fields: fieldsToInsert,
    });
  };

  return (
    <Button
      className="flex items-center gap-1 w-full hover:text-primary justify-start"
      variant="ghost"
      disabled={isPending}
      onClick={handleAddEmployment}
    >
      <PlusIcon /> Add employment
    </Button>
  );
};

export default AddEmploymentButton;
