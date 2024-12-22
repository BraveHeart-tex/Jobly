"use client";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { api } from "@/trpc/react";
import { Check, Cloud, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNetworkState } from "react-use";

const DebouncedDocumentSaver = () => {
  const { online, previous } = useNetworkState();
  const userLostConnection = !online && previous;
  const {
    mutate: saveDocumentAndRelatedEntities,
    isPending: isSavingDocument,
  } = api.document.saveDocumentAndRelatedEntities.useMutation();
  useLeavePageConfirm(isSavingDocument);

  useEffect(() => {
    if (userLostConnection) {
      useDocumentBuilderStore.setState({
        saveDocumentDetailsFn: () => {},
      });
      return;
    }

    useDocumentBuilderStore.setState({
      saveDocumentDetailsFn: saveDocumentAndRelatedEntities,
    });
  }, [userLostConnection, saveDocumentAndRelatedEntities]);

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
