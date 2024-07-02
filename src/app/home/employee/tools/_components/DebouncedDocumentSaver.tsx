"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { Check, Cloud, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useDebounce } from "react-use";

const DebouncedDocumentSaver = () => {
  const [isPending, startTransition] = useTransition();
  const state = useDocumentBuilderStore((state) => state);

  useDebounce(
    () => {
      if (!state.initialized) return;
      // const { document, sections, fieldValues, fields } = state;

      startTransition(async () => {
        await new Promise((r) => setTimeout(r, 1000));
        console.info(
          "DocumentBuilderPreview state changed saving to db",
          state,
        );
      });
    },
    1000,
    [state],
  );

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-1 text-muted dark:text-muted-foreground">
        <div className="relative">
          {isPending ? (
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
        <span className="text-xs">{isPending ? "Saving..." : "Saved"}</span>
      </div>
      <div />
    </div>
  );
};

export default DebouncedDocumentSaver;
