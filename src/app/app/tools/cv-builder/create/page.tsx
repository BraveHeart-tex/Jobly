"use client";
import { useRef } from "react";
import DocumentBuilderHeader from "../../_components/DocumentBuilderHeader";
import DocumentBuilderViewToggler from "../../_components/DocumentBuilderViewToggler";
import CvBuilderPersonalDetailsSection from "../../_components/CvBuilderPersonalDetailsSection";
import { Button } from "@/components/ui/button";
import { Check, Cloud } from "lucide-react";

const CreateCvPage = () => {
  const builderContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <main className="grid grid-cols-2 fixed top-0 z-50 w-full">
      <div
        className="bg-card min-h-screen p-10 overflow-auto max-h-screen"
        ref={builderContainerRef}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-center">
          <DocumentBuilderHeader />
          <DocumentBuilderViewToggler ref={builderContainerRef} />
        </div>
        <div className="mt-4 grid gap-2">
          <CvBuilderPersonalDetailsSection />
        </div>
      </div>
      <div className="bg-muted-foreground dark:bg-secondary min-h-screen">
        <div className="h-[91vh] w-[63%] mx-auto pt-4">
          <div className="w-full flex items-center justify-end mb-4">
            <Button className="self-end">Download PDF</Button>
          </div>
          <div className="bg-background rounded-md h-full w-full" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="relative">
                <Cloud size={28} strokeWidth={1} />
                <Check
                  className="absolute top-[11px] left-[8px]"
                  size={10}
                  strokeWidth={2}
                />
              </div>
              <span className="text-xs text-muted-foreground">Saved</span>
            </div>
            <div />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateCvPage;
