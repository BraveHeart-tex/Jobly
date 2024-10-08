"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CvBuilderPersonalDetailsSection from "@/features/candidate/document-builder/components/CvBuilderPersonalDetailsSection";
import CvBuilderProfessionalSummarySection from "@/features/candidate/document-builder/components/CvBuilderProfessionalSummarySection";
import CvBuilderSkillsSection from "@/features/candidate/document-builder/components/CvBuilderSkillsSection";
import CvBuilderWebsitesAndLinks from "@/features/candidate/document-builder/components/CvBuilderWebsitesAndLinks";
import DocumentBuilderHeader from "@/features/candidate/document-builder/components/DocumentBuilderHeader";
import DocumentBuilderViewToggle from "@/features/candidate/document-builder/components/DocumentBuilderViewToggle";
import SectionsDndContext from "@/features/candidate/document-builder/components/SectionsDndContext";
import { useDocumentBuilderSearchParams } from "@/features/candidate/document-builder/hooks/useDocumentBuilderSearchParams";
import {
  type INTERNAL_SECTION_TAG,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import { CANDIDATE_ROUTES } from "@/lib/routes";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn } from "@/lib/utils";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useRef } from "react";
import CvBuilderCoursesSection from "./CvBuilderCoursesSection";
import CvBuilderCustomSection from "./CvBuilderCustomSection";
import CvBuilderCustomSectionOptions from "./CvBuilderCustomSectionOptions";
import CvBuilderEducationSection from "./CvBuilderEducationSection";
import CvBuilderEmploymentHistorySection from "./CvBuilderEmploymentHistorySection";
import CvBuilderExtraCurricularSection from "./CvBuilderExtraCurricularSection";
import CvBuilderHobbiesSection from "./CvBuilderHobbiesSection";
import CvBuilderInternshipsSection from "./CvBuilderInternshipsSection";
import CvBuilderLanguagesSection from "./CvBuilderLanguagesSection";
import CvBuilderReferencesSection from "./CvBuilderReferencesSection";

const DocumentBuilderPanel = () => {
  const { view } = useDocumentBuilderSearchParams();
  const builderContainerRef = useRef<HTMLDivElement | null>(null);
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
      [INTERNAL_SECTION_TAGS.EDUCATION]: <CvBuilderEducationSection />,
      [INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS]: (
        <CvBuilderWebsitesAndLinks />
      ),
      [INTERNAL_SECTION_TAGS.SKILLS]: <CvBuilderSkillsSection />,
      [INTERNAL_SECTION_TAGS.CUSTOM]: (
        <CvBuilderCustomSection section={section} />
      ),
      [INTERNAL_SECTION_TAGS.INTERNSHIPS]: (
        <CvBuilderInternshipsSection section={section} />
      ),
      [INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES]: (
        <CvBuilderExtraCurricularSection section={section} />
      ),
      [INTERNAL_SECTION_TAGS.HOBBIES]: (
        <CvBuilderHobbiesSection section={section} />
      ),
      [INTERNAL_SECTION_TAGS.REFERENCES]: (
        <CvBuilderReferencesSection section={section} />
      ),
      [INTERNAL_SECTION_TAGS.COURSES]: (
        <CvBuilderCoursesSection section={section} />
      ),
      [INTERNAL_SECTION_TAGS.LANGUAGES]: (
        <CvBuilderLanguagesSection section={section} />
      ),
    };

    return (
      sectionsByTag[section.internalSectionTag as INTERNAL_SECTION_TAG] ?? null
    );
  };

  return (
    <div
      className={cn(
        "bg-background min-h-screen px-6 md:p-12 py-14 h-screen relative w-1/2 hide-scrollbar -mt-10",
        view === "builder" && "w-full xl:w-1/2",
        view === "preview" && "hidden xl:block",
      )}
      ref={builderContainerRef}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={CANDIDATE_ROUTES.DOCUMENT_BUILDER}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "absolute top-2 left-2",
              )}
            >
              <ArrowLeft />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Documents page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="max-w-screen-2xl mx-auto flex items-center justify-center">
        <DocumentBuilderHeader />
        <DocumentBuilderViewToggle />
      </div>
      <div className="grid gap-6 max-w-screen-2xl mx-auto">
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
      </div>
      <CvBuilderCustomSectionOptions />
    </div>
  );
};
export default DocumentBuilderPanel;
