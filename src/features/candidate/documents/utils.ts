import {
  type INTERNAL_SECTION_TAG,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import { exclude } from "@/lib/utils";
import type { DocumentSectionFieldValueInsertModel } from "@/server/db/schema/documentSectionFieldValues";
import type {
  DocumentSectionField,
  DocumentSectionFieldInsertModel,
} from "@/server/db/schema/documentSectionFields";
import type {
  DocumentSection,
  DocumentSectionInsertModel,
} from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import type { getDocumentWithSectionsAndFields } from "@/features/candidate/documents/repositories/documentRepository";

export const getFieldInsertTemplateBySectionTag = (
  sectionId: DocumentSection["id"],
  templateOption: INTERNAL_SECTION_TAG,
) => {
  const personalDetailsFields = getPersonalDetailsFields(sectionId);
  const professionalSummaryFields = getProfessionalSummaryFields(sectionId);
  const employmentHistoryFields = getEmploymentHistoryFields(sectionId);
  const customSectionFields = getCustomSectionFields(sectionId);
  const educationSectionFields = getEducationSectionFields(sectionId);
  const websitesAndSocialLinksSectionFields =
    getWebsitesAndSocialLinksSectionFields(sectionId);
  const skillSectionFields = getSkillSectionFields(sectionId);
  const courseSectionFields = getCourseSectionFields(sectionId);
  const extraCurricularActivitiesSectionFields =
    getExtraCurricularActivitiesFields(sectionId);
  const hobbiesSectionFields = getHobbiesSectionFields(sectionId);
  const referencesSectionFields = getReferencesSectionFields(sectionId);
  const languagesSectionFields = getLanguagesSectionFields(sectionId);

  const templateMap = {
    [INTERNAL_SECTION_TAGS.PERSONAL_DETAILS]: personalDetailsFields,
    [INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY]: professionalSummaryFields,
    [INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY]: employmentHistoryFields,
    [INTERNAL_SECTION_TAGS.EDUCATION]: educationSectionFields,
    [INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS]:
      websitesAndSocialLinksSectionFields,
    [INTERNAL_SECTION_TAGS.SKILLS]: skillSectionFields,
    [INTERNAL_SECTION_TAGS.CUSTOM]: customSectionFields,
    [INTERNAL_SECTION_TAGS.INTERNSHIPS]: employmentHistoryFields,
    [INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES]:
      extraCurricularActivitiesSectionFields,
    [INTERNAL_SECTION_TAGS.HOBBIES]: hobbiesSectionFields,
    [INTERNAL_SECTION_TAGS.COURSES]: courseSectionFields,
    [INTERNAL_SECTION_TAGS.REFERENCES]: referencesSectionFields,
    [INTERNAL_SECTION_TAGS.LANGUAGES]: languagesSectionFields,
  };

  return templateMap[templateOption] || [];
};

const getEmploymentHistoryFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
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
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

const getCustomSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
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
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getEducationSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
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
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getPersonalDetailsFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
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
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getProfessionalSummaryFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Professional Summary",
      fieldType: "richText",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getPredefinedDocumentSectionsWithDocumentId = (
  documentId: DocumentSelectModel["id"],
): DocumentSectionInsertModel[] => {
  return [
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
      fieldsContainerType:
        "collapsible" as DocumentSectionInsertModel["fieldsContainerType"],
      internalSectionTag: INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
      itemCountPerContainer: 6,
    },
    {
      documentId,
      name: "Education",
      displayOrder: 4,
      fieldsContainerType:
        "collapsible" as DocumentSectionInsertModel["fieldsContainerType"],
      internalSectionTag: INTERNAL_SECTION_TAGS.EDUCATION,
      itemCountPerContainer: 6,
    },
    {
      documentId,
      name: "Websites & Social Links",
      displayOrder: 5,
      fieldsContainerType:
        "collapsible" as DocumentSectionInsertModel["fieldsContainerType"],
      internalSectionTag: INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
      itemCountPerContainer: 2,
    },
    {
      documentId,
      name: "Skills",
      displayOrder: 6,
      fieldsContainerType:
        "collapsible" as DocumentSectionInsertModel["fieldsContainerType"],
      internalSectionTag: INTERNAL_SECTION_TAGS.SKILLS,
      metadata: JSON.stringify({
        showExperienceLevel: true,
      }),
      itemCountPerContainer: 2,
    },
  ].map((item) => ({
    ...item,
    defaultName: item.name,
  }));
};

export const generateFieldValue = (item: {
  fieldId: DocumentSectionField["id"];
  defaultValue?: string;
}) => ({
  fieldId: item.fieldId,
  value: item.defaultValue || "",
});

export const getWebsitesAndSocialLinksSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Label",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Link",
      fieldType: "string",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getSkillSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Skill",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Level",
      fieldType: "skillSelect",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getCourseSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Course",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Institution",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Start Date",
      fieldType: "date",
      sectionId,
    },
    {
      fieldName: "End Date",
      fieldType: "date",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getExtraCurricularActivitiesFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Function Title",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Start Date",
      fieldType: "date",
      sectionId,
    },
    {
      fieldName: "End Date",
      fieldType: "date",
      sectionId,
    },
    {
      fieldName: "Employer",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "City",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Description",
      fieldType: "richText",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getHobbiesSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "What do you like?",
      fieldType: "textarea",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getReferencesSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Referent's Full Name",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Company",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Phone",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Referent's Email",
      fieldType: "string",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const getLanguagesSectionFields = (
  sectionId: DocumentSection["id"],
): DocumentSectionFieldInsertModel[] =>
  [
    {
      fieldName: "Language",
      fieldType: "string",
      sectionId,
    },
    {
      fieldName: "Level",
      fieldType: "select",
      sectionId,
    },
  ].map((item, index) => ({ ...item, displayOrder: index + 1 }));

export const normalizeDocumentStructure = (
  nestedDocument: NonNullable<
    Awaited<ReturnType<typeof getDocumentWithSectionsAndFields>>
  >,
) => {
  return {
    document: exclude(nestedDocument, ["sections"]),
    sections: nestedDocument.sections.map((section) =>
      exclude(section, ["fields"]),
    ),
    fields: nestedDocument.sections.flatMap((section) =>
      section.fields.map((field) => exclude(field, ["fieldValues"])),
    ),
    fieldValues: nestedDocument.sections.flatMap((section) =>
      section.fields.flatMap((field) => field.fieldValues),
    ),
  };
};

export const makeFieldInsertDTOs = (
  sections: (DocumentSectionInsertModel & { id: DocumentSection["id"] })[],
): DocumentSectionFieldInsertModel[] => {
  const fieldInsertDTOs: DocumentSectionFieldInsertModel[] = [];

  for (const section of sections) {
    const sectionFields = getFieldInsertTemplateBySectionTag(
      section.id,
      section.internalSectionTag,
    );

    fieldInsertDTOs.push(...sectionFields);
  }

  return fieldInsertDTOs;
};

export const makeFieldValueInsertDTOs = (
  sectionFields: (DocumentSectionFieldInsertModel & {
    id: DocumentSectionField["id"];
  })[],
  defaultValues?: Record<string, string>,
): DocumentSectionFieldValueInsertModel[] => {
  return sectionFields.map((sectionField) => ({
    fieldId: sectionField.id,
    value: defaultValues?.[sectionField.fieldName] ?? "",
  }));
};
