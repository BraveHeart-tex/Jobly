"use client";
import CvBuilderPersonalDetailsSection from "@/app/home/employee/tools/_components/CvBuilderPersonalDetailsSection";
import CvBuilderProfessionalSummarySection from "@/app/home/employee/tools/_components/CvBuilderProfessionalSummarySection";
import DocumentBuilderHeader from "@/app/home/employee/tools/_components/DocumentBuilderHeader";
import DocumentBuilderViewToggle from "@/app/home/employee/tools/_components/DocumentBuilderViewToggle";
import { useDocumentBuilderSearchParams } from "@/app/home/employee/tools/_hooks/useDocumentBuilderSearchParams";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EMPLOYEE_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useRef } from "react";
import CvBuilderEmploymentHistorySection from "./CvBuilderEmploymentHistorySection";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section } from "@/server/db/schema";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";

const DocumentBuilderPanel = () => {
  const { view } = useDocumentBuilderSearchParams();
  const builderContainerRef = useRef<HTMLDivElement | null>(null);
  const sections = useDocumentBuilderStore((state) => state.sections);

  const renderSection = ({ internalSectionTag }: Section) => {
    const sectionsByTag: Record<string, React.JSX.Element> = {
      [INTERNAL_SECTION_TAGS.PERSONAL_DETAILS]: (
        <CvBuilderPersonalDetailsSection />
      ),
      [INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY]: (
        <CvBuilderProfessionalSummarySection />
      ),
      [INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY]: (
        <CvBuilderEmploymentHistorySection />
      ),
      [INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS]: (
        <div>Websites and Links Section</div>
      ),
    };

    // TODO: Handle custom sections as well
    return sectionsByTag[internalSectionTag] ?? null;
  };

  return (
    <div
      className={cn(
        "bg-background min-h-screen p-4 xl:p-12 pb-20 h-screen relative w-1/2 hide-scrollbar",
        view === "builder" && "w-full xl:w-1/2",
        view === "preview" && "hidden xl:block",
      )}
      ref={builderContainerRef}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={EMPLOYEE_ROUTES.DOCUMENT_BUILDER}
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
        <DocumentBuilderViewToggle ref={builderContainerRef} />
      </div>
      <div className="grid gap-6">
        {sections
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((section) => {
            return (
              <div key={section.id} className="grid gap-2">
                {renderSection(section)}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default DocumentBuilderPanel;
