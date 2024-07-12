"use client";

import { useDocumentBuilderSearchParams } from "@/app/home/employee/tools/_hooks/useDocumentBuilderSearchParams";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useNetworkState } from "react-use";
import DebouncedDocumentSaver from "./DebouncedDocumentSaver";

const DocumentBuilderPreview = () => {
  const { online, previous } = useNetworkState();
  const { view, setView } = useDocumentBuilderSearchParams();
  const userLostConnection = !online && previous;

  return (
    <div
      className={cn(
        "bg-muted-foreground dark:bg-secondary min-h-screen fixed top-0 right-0 w-1/2",
        view === "preview" && "w-full xl:w-1/2",
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
        <div className="bg-background rounded-md h-full w-full">
          {userLostConnection ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-center text-muted-foreground mx-auto max-w-[75%]">
                Document preview is not available in offline mode. Don't worry!
                You can still edit your resume. We'll automatically save your
                changes when you're back online.
              </p>
            </div>
          ) : null}
        </div>
        <div className="w-full flex items-center justify-between">
          <DebouncedDocumentSaver />
          <span className="text-xs text-muted dark:text-muted-foreground">
            Your changes are automatically saved.
          </span>
        </div>
      </div>
    </div>
  );
};
export default DocumentBuilderPreview;
