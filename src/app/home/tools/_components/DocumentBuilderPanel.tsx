"use client";
import CvBuilderPersonalDetailsSection from "@/app/home/tools/_components/CvBuilderPersonalDetailsSection";
import CvBuilderProfessionalSummarySection from "@/app/home/tools/_components/CvBuilderProfessionalSummarySection";
import DocumentBuilderHeader from "@/app/home/tools/_components/DocumentBuilderHeader";
import DocumentBuilderViewToggle from "@/app/home/tools/_components/DocumentBuilderViewToggle";
import { useDocumentBuilderSearchParams } from "@/app/home/tools/_hooks/useDocumentBuilderSearchParams";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const DocumentBuilderPanel = () => {
  const { view } = useDocumentBuilderSearchParams();
  const builderContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={cn(
        "bg-card min-h-screen p-4 xl:p-10 overflow-auto max-h-screen",
        view === "builder" && "col-span-2 xl:col-span-1",
        view === "preview" && "hidden xl:block",
      )}
      ref={builderContainerRef}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-center">
        <DocumentBuilderHeader />
        <DocumentBuilderViewToggle ref={builderContainerRef} />
      </div>
      <div className="mt-4 grid gap-2">
        <CvBuilderPersonalDetailsSection />
      </div>
      <div className="mt-4 grid gap-2">
        <CvBuilderProfessionalSummarySection />
      </div>
    </div>
  );
};
export default DocumentBuilderPanel;
