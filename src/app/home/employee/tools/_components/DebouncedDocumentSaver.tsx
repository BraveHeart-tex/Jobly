"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { api } from "@/trpc/react";
import { Check, Cloud, Loader2 } from "lucide-react";
import { useDebounce } from "react-use";

const DebouncedDocumentSaver = () => {
  const { mutate: saveDocumentDetails, isPending: isSavingDocument } =
    api.document.saveDocumentDetails.useMutation();
  const state = useDocumentBuilderStore((state) => state);

  // TODO: will have to find a way to skip the initial render
  // to make sure that we only save to the db once the user edits the document
  useDebounce(
    () => {
      if (!state.initialized) return;
      const { document, sections, fieldValues, fields } = state;

      saveDocumentDetails({ document, sections, fields, fieldValues });
    },
    1000,
    [state],
  );

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-1 text-muted dark:text-muted-foreground">
        <div className="relative">
          {isSavingDocument ? (
            <Loader2 className="animate-spin" size={28} strokeWidth={1} />
          ) : (
            <>
              <Cloud size={28} strokeWidth={1} />
              <Check
                className="absolute top-[11px] left-[8px]"
                size={10}
                strokeWidth={2}
              />
            </>
          )}
        </div>
        <span className="text-xs">
          {isSavingDocument ? "Saving..." : "Saved"}
        </span>
      </div>
      <div />
    </div>
  );
};

export default DebouncedDocumentSaver;
