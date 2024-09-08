import { COURSES_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderCoursesSection";
import { CUSTOM_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderCustomSection";
import { EDUCATION_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderEducationSection";
import { EMPLOYMENT_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderEmploymentHistorySection";
import { EXTRA_CURRICULAR_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderExtraCurricularSection";
import { INTERNSHIP_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderInternshipsSection";
import { LANGUAGES_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderLanguagesSection";
import { REFERENCES_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderReferencesSection";
import { SKILL_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderSkillsSection";
import { WEBSITES_SOCIAL_LINKS_SECTION_ITEMS_COUNT } from "@/features/candidate/document-builder/components/CvBuilderWebsitesAndLinks";
import {
  type INTERNAL_SECTION_TAG,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import type { DocumentBuilderConfig } from "@/lib/types";
import { exclude, groupEveryN } from "@/lib/utils";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

export type SectionFieldWithValue = DocumentSectionField & {
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

export const getIfItemsShouldRender = <T extends Record<string, unknown>>(
  items: T[],
): boolean => {
  return (
    items.length > 0 &&
    items.some((item) => {
      const keys = Object.keys(item) as Array<keyof T>;
      return keys.filter((key) => key !== "id").some((key) => item[key]);
    })
  );
};

export const makeResumeTemplateData = (data: DocumentBuilderConfig) => {
  const transformedData = transformDocumentBuilderData(data);

  const personalDetailsSection =
    makePersonalDetailsSectionData(transformedData);
  const professionalSummarySection =
    makeProfessionalSummarySectionData(transformedData);
  const websitesAndLinksSection =
    makeWebsitesAndLinksSectionData(transformedData);
  const employmentHistorySection =
    makeEmploymentHistorySectionData(transformedData);
  const educationSection = makeEducationSectionData(transformedData);
  const skillsSection = makeSkillsSectionData(transformedData);
  const internshipsSection = makeInternshipsSectionData(transformedData);
  const referencesSection = makeReferencesSectionData(transformedData);
  const hobbiesSection = makeHobbiesSectionData(transformedData);
  const languagesSection = makeLanguagesSectionData(transformedData);
  const coursesSection = makeCoursesSectionData(transformedData);
  const extraCurricularActivitiesSection =
    makeExtraCurricularActivitiesSectionData(transformedData);

  return {
    personalDetailsSection,
    professionalSummarySection,
    websitesAndLinksSection,
    employmentHistorySection,
    educationSection,
    skillsSection,
    internshipsSection,
    referencesSection,
    hobbiesSection,
    languagesSection,
    coursesSection,
    extraCurricularActivitiesSection,
  };
};

export const makeCustomResumeSectionsData = (data: DocumentBuilderConfig) => {
  const transformedData = transformDocumentBuilderData(data);
  return {
    ...makeCustomSectionData(transformedData),
  };
};

type TransformedResumeData = ReturnType<typeof transformDocumentBuilderData>;
export type MakeResumeDataReturn = ReturnType<typeof makeResumeTemplateData>;

const getSectionByTag = (
  sections: TransformedResumeData["sections"],
  sectionTag: INTERNAL_SECTION_TAG,
) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return sections.find((section) => section.internalSectionTag === sectionTag)!;
};

const makePersonalDetailsSectionData = (
  transformedData: TransformedResumeData,
) => {
  const personalDetailsSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
  );

  const getPersonalDetailsSectionFieldValues = (fieldName: string) => {
    return getFieldValue(fieldName, personalDetailsSection?.fields);
  };

  const firstName = getPersonalDetailsSectionFieldValues("First Name");
  const lastName = getPersonalDetailsSectionFieldValues("Last Name");
  const jobTitle = getPersonalDetailsSectionFieldValues("Wanted Job Title");
  const address = getPersonalDetailsSectionFieldValues("Address");
  const city = getPersonalDetailsSectionFieldValues("City");
  const postalCode = getPersonalDetailsSectionFieldValues("Postal Code");
  const placeOfBirth = getPersonalDetailsSectionFieldValues("Place of Birth");
  const phone = getPersonalDetailsSectionFieldValues("Phone");
  const email = getPersonalDetailsSectionFieldValues("Email");
  const driversLicense =
    getPersonalDetailsSectionFieldValues("Driving License");
  const dateOfBirth = getPersonalDetailsSectionFieldValues("Date of Birth");

  return {
    ...exclude(personalDetailsSection, ["fields"]),
    firstName,
    lastName,
    jobTitle,
    address,
    city,
    postalCode,
    placeOfBirth,
    phone,
    email,
    driversLicense,
    dateOfBirth,
  };
};

const makeProfessionalSummarySectionData = (
  transformedData: TransformedResumeData,
) => {
  const professionalSummarySection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
  );

  const getProfessionalSummarySectionFieldValues = (fieldName: string) => {
    return getFieldValue(fieldName, professionalSummarySection?.fields);
  };

  const professionalSummary = getProfessionalSummarySectionFieldValues(
    "Professional Summary",
  );

  return {
    ...exclude(professionalSummarySection, ["fields"]),
    professionalSummary,
  };
};

const makeWebsitesAndLinksSectionData = (
  transformedData: TransformedResumeData,
) => {
  const websitesAndLinksSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
  );

  const websitesAndLinks = groupEveryN(
    websitesAndLinksSection?.fields || [],
    WEBSITES_SOCIAL_LINKS_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      label: group[0]?.value,
      link: group[1]?.value,
    };
  });

  const shouldRenderWebsitesAndLinks =
    websitesAndLinks.length > 0 && websitesAndLinks.some((item) => item.label);

  return {
    ...exclude(websitesAndLinksSection, ["fields"]),
    websitesAndLinks,
    shouldRenderWebsitesAndLinks,
  };
};

const makeEmploymentHistorySectionData = (
  transformedData: TransformedResumeData,
) => {
  const employmentHistorySection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
  );

  const employmentHistoryItems = groupEveryN(
    employmentHistorySection?.fields || [],
    EMPLOYMENT_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      jobTitle: group[0]?.value,
      startDate: group[1]?.value,
      endDate: group[2]?.value,
      employer: group[3]?.value,
      city: group[4]?.value,
      description: group[5]?.value,
    };
  });

  const shouldRenderEmploymentHistoryItems = getIfItemsShouldRender(
    employmentHistoryItems,
  );

  return {
    ...exclude(employmentHistorySection, ["fields"]),
    employmentHistoryItems,
    shouldRenderEmploymentHistoryItems,
  };
};

const makeEducationSectionData = (transformedData: TransformedResumeData) => {
  const educationSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.EDUCATION,
  );

  const educationSectionItems = groupEveryN(
    educationSection?.fields || [],
    EDUCATION_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      school: group[0]?.value,
      degree: group[1]?.value,
      startDate: group[2]?.value,
      endDate: group[3]?.value,
      city: group[4]?.value,
      description: group[5]?.value,
    };
  });

  const shouldRenderEducationSectionItems = getIfItemsShouldRender(
    educationSectionItems,
  );

  return {
    ...exclude(educationSection, ["fields"]),
    educationSectionItems,
    shouldRenderEducationSectionItems,
  };
};

const makeSkillsSectionData = (transformedData: TransformedResumeData) => {
  const skillsSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.SKILLS,
  );

  const skillsSectionItems = groupEveryN(
    skillsSection.fields,
    SKILL_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      name: group[0]?.value,
      level: group[1]?.value,
    };
  });

  const shouldRenderSkillsSectionItems =
    getIfItemsShouldRender(skillsSectionItems);

  return {
    ...exclude(skillsSection, ["fields"]),
    skillsSectionItems,
    shouldRenderSkillsSectionItems,
  };
};

const makeInternshipsSectionData = (transformedData: TransformedResumeData) => {
  const internshipsSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.INTERNSHIPS,
  );
  const internshipsSectionItems = groupEveryN(
    internshipsSection?.fields || [],
    INTERNSHIP_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      jobTitle: group[0]?.value,
      startDate: group[1]?.value,
      endDate: group[2]?.value,
      employer: group[3]?.value,
      city: group[4]?.value,
      description: group[5]?.value,
    };
  });

  const shouldRenderInternshipSectionItems = getIfItemsShouldRender(
    internshipsSectionItems,
  );

  return {
    ...exclude(internshipsSection, ["fields"]),
    internshipsSectionItems,
    shouldRenderInternshipSectionItems,
  };
};

const makeReferencesSectionData = (transformedData: TransformedResumeData) => {
  const referencesSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.REFERENCES,
  );

  const referencesSectionItems = groupEveryN(
    referencesSection?.fields || [],
    REFERENCES_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      referentFullName: group[0]?.value,
      referentCompany: group[1]?.value,
      referentPhone: group[2]?.value,
      referentEmail: group[3]?.value,
    };
  });

  const shouldRenderReferencesSectionItems = getIfItemsShouldRender(
    referencesSectionItems,
  );

  return {
    ...exclude(referencesSection, ["fields"]),
    referencesSectionItems,
    shouldRenderReferencesSectionItems,
  };
};

const makeHobbiesSectionData = (transformedData: TransformedResumeData) => {
  const hobbiesSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.HOBBIES,
  );

  const hobbies = hobbiesSection?.fields.map((item) => item?.value);
  const shouldRenderHobbiesSectionItems = hobbiesSection?.fields.some(
    (item) => item.value,
  );

  return {
    ...exclude(hobbiesSection, ["fields"]),
    hobbies,
    shouldRenderHobbiesSectionItems,
  };
};

const makeLanguagesSectionData = (transformedData: TransformedResumeData) => {
  const languagesSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.LANGUAGES,
  );

  const languagesSectionItems = groupEveryN(
    languagesSection?.fields || [],
    LANGUAGES_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      language: group[0]?.value,
      level: group[1]?.value,
    };
  });

  const shouldRenderLanguagesSectionItems = getIfItemsShouldRender(
    languagesSectionItems,
  );

  return {
    ...exclude(languagesSection, ["fields"]),
    languagesSectionItems,
    shouldRenderLanguagesSectionItems,
  };
};

const makeCoursesSectionData = (transformedData: TransformedResumeData) => {
  const coursesSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.COURSES,
  );

  const coursesSectionItems = groupEveryN(
    coursesSection?.fields || [],
    COURSES_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      course: group[0]?.value,
      institution: group[1]?.value,
      startDate: group[2]?.value,
      endDate: group[3]?.value,
    };
  });

  const shouldRenderCoursesSectionItems =
    getIfItemsShouldRender(coursesSectionItems);

  return {
    ...exclude(coursesSection, ["fields"]),
    coursesSectionItems,
    shouldRenderCoursesSectionItems,
  };
};

const makeExtraCurricularActivitiesSectionData = (
  transformedData: TransformedResumeData,
) => {
  const extraCurricularActivitiesSection = getSectionByTag(
    transformedData.sections,
    INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
  );

  const extraCurricularActivitiesSectionItems = groupEveryN(
    extraCurricularActivitiesSection?.fields || [],
    EXTRA_CURRICULAR_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      functionTitle: group[0]?.value,
      startDate: group[1]?.value,
      endDate: group[2]?.value,
      employer: group[3]?.value,
      city: group[4]?.value,
      description: group[5]?.value,
    };
  });

  const shouldRenderExtraCurricularActivitiesSectionItems =
    getIfItemsShouldRender(extraCurricularActivitiesSectionItems);

  return {
    ...exclude(extraCurricularActivitiesSection, ["fields"]),
    extraCurricularActivitiesSectionItems,
    shouldRenderExtraCurricularActivitiesSectionItems,
  };
};

export type CustomSection = {
  customSectionItems: {
    id: string;
    name: string | undefined;
    city: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    description: string | undefined;
  }[];
  fields: {
    value: string;
    id: number;
    sectionId: number;
    fieldName: string;
    fieldType: string;
  }[];
  id: number;
  documentId: number;
  name: string;
  fieldsContainerType: "collapsible" | "static";
  displayOrder: number;
  internalSectionTag: INTERNAL_SECTION_TAG;
  itemCountPerContainer: number;
  metadata: string | null;
  shouldRenderCustomSectionItems: boolean;
};

const makeCustomSectionData = (transformedData: TransformedResumeData) => {
  const customSections = transformedData.sections
    .filter(
      (section) => section.internalSectionTag === INTERNAL_SECTION_TAGS.CUSTOM,
    )
    .map((customSection) => {
      const sectionItems = groupEveryN(
        customSection?.fields || [],
        CUSTOM_SECTION_ITEMS_COUNT,
      ).map((group) => {
        return {
          id: crypto.randomUUID(),
          name: group[0]?.value,
          city: group[1]?.value,
          startDate: group[2]?.value,
          endDate: group[3]?.value,
          description: group[4]?.value,
        };
      });

      const shouldRenderCustomSectionItems =
        getIfItemsShouldRender(sectionItems);

      return {
        ...exclude(customSection, ["fields"]),
        customSectionItems: sectionItems,
        shouldRenderCustomSectionItems,
      };
    });

  return customSections;
};

export const preparePdfData = (data: DocumentBuilderConfig) => {
  const { document, sections, fields, fieldValues } = data;
  const resumeTemplateData = makeResumeTemplateData({
    document,
    sections,
    fields,
    fieldValues,
  }) as unknown as MakeResumeDataReturn;
  const customSections = makeCustomResumeSectionsData({
    document,
    sections,
    fields,
    fieldValues,
  });

  return {
    ...resumeTemplateData,
    ...customSections,
  };
};
