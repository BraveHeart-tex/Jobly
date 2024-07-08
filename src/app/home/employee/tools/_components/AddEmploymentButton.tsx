"use client";
import { Button } from "@/components/ui/button";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type {
  Section,
  SectionField,
  SectionFieldInsertModel,
  SectionFieldValue,
} from "@/server/db/schema";
import { api } from "@/trpc/react";
import { PlusIcon } from "lucide-react";

type AddEmploymentButtonProps = {
  sectionId: Section["id"];
};

const AddEmploymentButton = ({ sectionId }: AddEmploymentButtonProps) => {
  const addField = useDocumentBuilderStore((state) => state.addField);
  const addFieldValue = useDocumentBuilderStore((state) => state.addFieldValue);
  const fieldsToInsert: SectionFieldInsertModel[] = [
    {
      fieldName: "Job Title",
      sectionId,
      fieldType: "string",
    },
    {
      fieldName: "Start Date",
      sectionId,
      fieldType: "date",
    },
    {
      fieldName: "End Date",
      sectionId,
      fieldType: "date",
    },
    {
      fieldName: "Employer",
      sectionId,
      fieldType: "string",
    },
    {
      fieldName: "Description",
      sectionId,
      fieldType: "richText",
    },
  ];

  const { mutate: addFields, isPending } = api.document.addFields.useMutation({
    onSuccess(data) {
      const mappedFields = fieldsToInsert.map((field, index) => ({
        ...field,
        id: data[index] as SectionField["id"],
      }));

      const getFieldValueDto = (field: SectionField): SectionFieldValue => ({
        id: 0,
        fieldId: field.id,
        value: "",
      });

      for (const field of mappedFields) {
        addField(field);
        addFieldValue(getFieldValueDto(field));
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
