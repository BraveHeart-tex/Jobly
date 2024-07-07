"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { api } from "@/trpc/react";
import { Check, Cloud, Loader2 } from "lucide-react";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { useNetworkState } from "react-use";
const SAVE_DOCUMENT_DEBOUNCE_DURATION = 600 as const;

const DebouncedDocumentSaver = () => {
  const { online, previous } = useNetworkState();
  const userLostConnection = !online && previous;
  const { mutate: saveDocumentDetails, isPending: isSavingDocument } =
    api.document.saveDocumentDetails.useMutation();
  const setSaveDocumentDetailsFn = useDocumentBuilderStore(
    (state) => state.setSaveDocumentDetailsFn,
  );

  useEffect(() => {
    if (!userLostConnection) {
      const debouncedSaveDocumentDetails = debounce(
        saveDocumentDetails,
        SAVE_DOCUMENT_DEBOUNCE_DURATION,
      );
      setSaveDocumentDetailsFn(debouncedSaveDocumentDetails);
    } else {
      setSaveDocumentDetailsFn(() => {});
    }
  }, [userLostConnection, setSaveDocumentDetailsFn, saveDocumentDetails]);

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
