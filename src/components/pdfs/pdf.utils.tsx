import type { DocumentBuilderConfig } from "@/lib/types";
import type { SectionField } from "@/server/db/schema";

export type SectionFieldWithValue = SectionField & {
  value: string;
};

export const transformDocumentBuilderData = (data: DocumentBuilderConfig) => {
  const { document, sections, fields, fieldValues } = data;

  const mappedSections = sections.map((section) => {
    const sectionFields = fields
      .filter((field) => field.sectionId === section.id)
      .map((field) => {
        const fieldValue =
          fieldValues.find((value) => value.fieldId === field.id)?.value || "";
        return {
          ...field,
          value: fieldValue,
        };
      });

    return {
      ...section,
      fields: sectionFields,
    };
  });

  return {
    ...document,
    sections: mappedSections,
  };
};

export const getFieldValue = (
  fieldName: string,
  fields?: SectionFieldWithValue[],
) => {
  if (!fields) return "";
  return fields.find((field) => field.fieldName === fieldName)?.value || "";
};
