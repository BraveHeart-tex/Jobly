import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import type {
  Document,
  Section,
  SectionField,
  SectionFieldInsertModel,
  SectionInsertModel,
} from "@/server/db/schema";

export type FieldTemplateOption =
  (typeof INTERNAL_SECTION_TAGS)[keyof typeof INTERNAL_SECTION_TAGS];

export const getFieldInsertTemplate = (
  sectionId: Section["id"],
  templateOption: FieldTemplateOption,
) => {
  const personalDetailsFields = getPersonalDetailsFields(sectionId);
  const professionalSummaryFields = getProfessionalSummaryFields(sectionId);
  const employmentHistoryFields = getEmploymentHistoryFields(sectionId);
  const customSectionFields = getCustomSectionFields(sectionId);
  const educationSectionFields = getEducationSectionFields(sectionId);

  const templateMap = {
    [INTERNAL_SECTION_TAGS.PERSONAL_DETAILS]: personalDetailsFields,
    [INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY]: professionalSummaryFields,
    [INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY]: employmentHistoryFields,
    [INTERNAL_SECTION_TAGS.EDUCATION]: educationSectionFields,
    // TODO: WEBSITES_SOCIAL_LINKS
    [INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS]: [],
    // TODO: SKILLS
    [INTERNAL_SECTION_TAGS.SKILLS]: [],
    [INTERNAL_SECTION_TAGS.CUSTOM]: customSectionFields,
    [INTERNAL_SECTION_TAGS.INTERNSHIP]: employmentHistoryFields,
  };

  return templateMap[templateOption] ?? [];
};

const getEmploymentHistoryFields = (
  sectionId: Section["id"],
): SectionFieldInsertModel[] => [
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

const getCustomSectionFields = (
  sectionId: Section["id"],
): SectionFieldInsertModel[] => [
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

export const getEducationSectionFields = (
  sectionId: Section["id"],
): SectionFieldInsertModel[] => [
  {
    fieldName: "School",
    sectionId,
    fieldType: "string",
  },
  {
    fieldName: "Degree",
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

export const getPersonalDetailsFields = (
  sectionId: Section["id"],
): SectionFieldInsertModel[] => [
  {
    fieldName: "Wanted Job Title",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "First Name",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Last Name",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Email",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Phone",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Country",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "City",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Address",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Postal Code",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Driving License",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Place of Birth",
    fieldType: "text",
    sectionId,
  },
  {
    fieldName: "Date of Birth",
    fieldType: "text",
    sectionId,
  },
];

export const getProfessionalSummaryFields = (
  sectionId: Section["id"],
): SectionFieldInsertModel[] => [
  {
    fieldName: "Professional Summary",
    fieldType: "richText",
    sectionId,
  },
];

export const getPredefinedDocumentSections = (
  documentId: Document["id"],
): SectionInsertModel[] => [
  {
    documentId,
    name: "Personal Details",
    displayOrder: 1,
    internalSectionTag: INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
  },
  {
    documentId,
    name: "Professional Summary",
    displayOrder: 2,
    internalSectionTag: INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
  },
  {
    documentId,
    name: "Employment History",
    displayOrder: 3,
    fieldsContainerType: "collapsible",
    internalSectionTag: INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
  },
  {
    documentId,
    name: "Education",
    displayOrder: 4,
    fieldsContainerType: "collapsible",
    internalSectionTag: INTERNAL_SECTION_TAGS.EDUCATION,
  },
  {
    documentId,
    name: "Websites & Social Links",
    displayOrder: 5,
    fieldsContainerType: "collapsible",
    internalSectionTag: INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
  },
  {
    documentId,
    name: "Skills",
    displayOrder: 6,
    fieldsContainerType: "collapsible",
    internalSectionTag: INTERNAL_SECTION_TAGS.SKILLS,
  },
];

export const generateFieldValue = (item: {
  fieldId: SectionField["id"];
  defaultValue?: string;
}) => ({
  fieldId: item.fieldId,
  value: item.defaultValue || "",
});
