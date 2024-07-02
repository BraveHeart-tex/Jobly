"use client";

import { useDocumentBuilderSearchParams } from "@/app/home/tools/_hooks/useDocumentBuilderSearchParams";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import DebouncedDocumentSaver from "./DebouncedDocumentSaver";

const DocumentBuilderPreview = () => {
  const { view, setView } = useDocumentBuilderSearchParams();

  return (
    <div
      className={cn(
        "bg-muted-foreground dark:bg-secondary min-h-screen",
        view === "preview" && "col-span-2 xl:col-span-1",
        view === "builder" && "hidden xl:block",
      )}
    >
      <div className="h-[90vh] w-[90%] xl:w-[66%] mx-auto pt-4">
        <div
          className={cn(
            "w-full flex items-center justify-between xl:justify-end mb-2",
          )}
        >
          <Button
            className={cn(
              "xl:hidden text-muted dark:text-secondary-foreground",
              view === "preview" && "flex xl:hidden",
            )}
            variant="ghost"
            onClick={() => {
              setView("builder");
            }}
          >
            <ArrowLeft />
          </Button>
          <Button className="self-end">Download PDF</Button>
        </div>
        <div className="bg-background rounded-md h-full w-full" />
        <DebouncedDocumentSaver />
      </div>
    </div>
  );
};
export default DocumentBuilderPreview;
