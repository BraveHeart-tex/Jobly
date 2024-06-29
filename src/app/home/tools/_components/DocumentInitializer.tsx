"use client";

import { useEffect } from "react";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import type { DocumentBuilderConfig } from "@/lib/types";

type DocumentInitializerProps = {
  documentData?: DocumentBuilderConfig;
};

const DocumentInitializer = ({ documentData }: DocumentInitializerProps) => {
  const initializeState = useDocumentBuilderStore(
    (state) => state.initializeState,
  );
  const currentUser = useCurrentUserStore((state) => state.user);

  useEffect(() => {
    if (!documentData || Object.keys(documentData).length === 0 || !currentUser)
      return;

    initializeState(currentUser, documentData);
  }, [documentData, currentUser, initializeState]);

  return null;
};

export default DocumentInitializer;
