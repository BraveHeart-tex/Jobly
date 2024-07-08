import type { Section, SectionFieldInsertModel } from "@/server/db/schema";

const TEMPLATE_OPTIONS = {
  EMPLOYMENT_HISTORY: "employmentHistory",
  INTERNSHIP: "internship",
  CUSTOM_SECTION_ITEM: "customSectionItem",
} as const;

type FieldTemplateOption =
  (typeof TEMPLATE_OPTIONS)[keyof typeof TEMPLATE_OPTIONS];

export const getFieldInsertTemplate = (
  sectionId: Section["id"],
  templateOption: FieldTemplateOption,
) => {
  const employmentHistoryFields: SectionFieldInsertModel[] = [
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
      fieldName: "City",
      sectionId,
      fieldType: "string",
    },
    {
      fieldName: "Description",
      sectionId,
      fieldType: "richText",
    },
  ];
  const customSectionFields: SectionFieldInsertModel[] = [
    {
      fieldName: "Activity name, job title, book title etc.",
      sectionId,
      fieldType: "string",
    },
    {
      fieldName: "City",
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
      fieldName: "Description",
      sectionId,
      fieldType: "richText",
    },
  ];

  const templateMap = {
    [TEMPLATE_OPTIONS.EMPLOYMENT_HISTORY]: employmentHistoryFields,
    [TEMPLATE_OPTIONS.INTERNSHIP]: employmentHistoryFields,
    [TEMPLATE_OPTIONS.CUSTOM_SECTION_ITEM]: customSectionFields,
  };

  return templateMap[templateOption] ?? [];
};
