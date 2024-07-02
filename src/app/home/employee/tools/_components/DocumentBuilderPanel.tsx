"use client";
import CvBuilderPersonalDetailsSection from "@/app/home/employee/tools/_components/CvBuilderPersonalDetailsSection";
import CvBuilderProfessionalSummarySection from "@/app/home/employee/tools/_components/CvBuilderProfessionalSummarySection";
import DocumentBuilderHeader from "@/app/home/employee/tools/_components/DocumentBuilderHeader";
import DocumentBuilderViewToggle from "@/app/home/employee/tools/_components/DocumentBuilderViewToggle";
import { useDocumentBuilderSearchParams } from "@/app/home/employee/tools/_hooks/useDocumentBuilderSearchParams";
import { buttonVariants } from "@/components/ui/button";
import { EMPLOYEE_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const DocumentBuilderPanel = () => {
  const { view } = useDocumentBuilderSearchParams();
  const builderContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={cn(
        "bg-card min-h-screen p-4 xl:p-10 overflow-auto max-h-screen relative",
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
    </div>
  );
};
export default DocumentBuilderPanel;