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
import { useRef } from "react";
import CvBuilderEmploymentHistorySection from "./CvBuilderEmploymentHistorySection";

const DocumentBuilderPanel = () => {
  const { view } = useDocumentBuilderSearchParams();
  const builderContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={cn(
        "bg-card min-h-screen p-4 xl:p-10 pb-20 h-screen relative w-1/2 hide-scrollbar",
        view === "builder" && "w-full xl:w-1/2",
        view === "preview" && "hidden xl:block",
      )}
      ref={builderContainerRef}
    >
      <TooltipProvider delayDuration={300}>
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
      <div className="mt-4 grid gap-2">
        <CvBuilderPersonalDetailsSection />
      </div>
      <div className="mt-4 grid gap-2">
        <CvBuilderProfessionalSummarySection />
      </div>
      <div className="mt-4 grid gap-2">
        <CvBuilderEmploymentHistorySection />
      </div>
    </div>
  );
};
export default DocumentBuilderPanel;
