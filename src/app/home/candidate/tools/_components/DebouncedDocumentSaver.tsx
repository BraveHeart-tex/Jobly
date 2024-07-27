"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { api } from "@/trpc/react";
import debounce from "lodash.debounce";
import { Check, Cloud, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNetworkState } from "react-use";
import { useLeavePageConfirm } from "../_hooks/useLeavePageConfirm";

const SAVE_DOCUMENT_DEBOUNCE_DURATION = 500 as const;

const DebouncedDocumentSaver = () => {
  const { online, previous } = useNetworkState();
  const userLostConnection = !online && previous;
  const { mutate: saveDocumentDetails, isPending: isSavingDocument } =
    api.document.saveDocumentDetails.useMutation();
  useLeavePageConfirm(isSavingDocument);

  useEffect(() => {
    if (!userLostConnection) {
      const debouncedSaveDocumentDetails = debounce(
        saveDocumentDetails,
        SAVE_DOCUMENT_DEBOUNCE_DURATION,
      );
      useDocumentBuilderStore.setState({
        saveDocumentDetailsFn: debouncedSaveDocumentDetails,
      });
    } else {
      useDocumentBuilderStore.setState({
        saveDocumentDetailsFn: () => {},
      });
    }
  }, [userLostConnection, saveDocumentDetails]);

  return (
    <div className="flex items-center justify-between">
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
        <span className="text-xs w-10">
          {isSavingDocument ? "Saving..." : "Saved"}
        </span>
      </div>
      <div />
    </div>
  );
};

export default DebouncedDocumentSaver;
