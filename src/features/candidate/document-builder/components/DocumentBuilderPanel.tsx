"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CvBuilderCustomSectionOptions from "@/features/candidate/document-builder/components/CvBuilderCustomSectionOptions";
import DocumentBuilderHeader from "@/features/candidate/document-builder/components/DocumentBuilderHeader";
import DocumentBuilderViewToggle from "@/features/candidate/document-builder/components/DocumentBuilderViewToggle";
import DocumentSectionsContainer from "@/features/candidate/document-builder/components/DocumentSectionsContainer";
import { useDocumentBuilderSearchParams } from "@/features/candidate/document-builder/hooks/useDocumentBuilderSearchParams";
import { CANDIDATE_ROUTES } from "@/lib/routes";
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
        <DocumentSectionsContainer />
      </div>
      <CvBuilderCustomSectionOptions />
    </div>
  );
};
export default DocumentBuilderPanel;
