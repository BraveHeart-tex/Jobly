import CvBuilderEmploymentHistorySection from "@/features/candidate/document-builder/components/CvBuilderEmploymentHistorySection";
import CvBuilderPersonalDetailsSection from "@/features/candidate/document-builder/components/CvBuilderPersonalDetailsSection";
import CvBuilderProfessionalSummarySection from "@/features/candidate/document-builder/components/CvBuilderProfessionalSummarySection";
import SectionsDndContext from "@/features/candidate/document-builder/components/SectionsDndContext";
import {
  type INTERNAL_SECTION_TAG,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import type React from "react";

const DocumentSectionsContainer = () => {
  const sections = useDocumentBuilderStore((state) => state.sections);

  const renderSection = (section: DocumentSection) => {
    const sectionsByTag: Record<INTERNAL_SECTION_TAG, React.JSX.Element> = {
      [INTERNAL_SECTION_TAGS.PERSONAL_DETAILS]: (
        <CvBuilderPersonalDetailsSection />
      ),
      [INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY]: (
        <CvBuilderProfessionalSummarySection />
      ),
      [INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY]: (
        <CvBuilderEmploymentHistorySection />
      ),
      // [INTERNAL_SECTION_TAGS.EDUCATION]: <CvBuilderEducationSection />,
      // [INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS]: (
      //   <CvBuilderWebsitesAndLinks />
      // ),
      // [INTERNAL_SECTION_TAGS.SKILLS]: <CvBuilderSkillsSection />,
      // [INTERNAL_SECTION_TAGS.CUSTOM]: (
      //   <CvBuilderCustomSection section={section} />
      // ),
      // [INTERNAL_SECTION_TAGS.INTERNSHIPS]: (
      //   <CvBuilderInternshipsSection section={section} />
      // ),
      // [INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES]: (
      //   <CvBuilderExtraCurricularSection section={section} />
      // ),
      // [INTERNAL_SECTION_TAGS.HOBBIES]: (
      //   <CvBuilderHobbiesSection section={section} />
      // ),
      // [INTERNAL_SECTION_TAGS.REFERENCES]: (
      //   <CvBuilderReferencesSection section={section} />
      // ),
      // [INTERNAL_SECTION_TAGS.COURSES]: (
      //   <CvBuilderCoursesSection section={section} />
      // ),
      // [INTERNAL_SECTION_TAGS.LANGUAGES]: (
      //   <CvBuilderLanguagesSection section={section} />
      // ),
    };

    return (
      sectionsByTag[section.internalSectionTag as INTERNAL_SECTION_TAG] ?? null
    );
  };

  return (
    <SectionsDndContext>
      {sections
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((section) => {
          return (
            <div key={section.id} className="grid gap-2">
              {renderSection(section)}
            </div>
          );
        })}
    </SectionsDndContext>
  );
};
export default DocumentSectionsContainer;
