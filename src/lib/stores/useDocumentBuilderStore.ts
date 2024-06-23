import type { Document } from "@/server/db/schema";
import { create } from "zustand";

type DocumentBuilderStore = {
  document: Partial<Document> | null;
  setDocument: (document: Partial<Document> | null) => void;
  setDocumentValue: <K extends keyof Document>(
    key: K,
    value: Document[K],
  ) => void;
  view: "builder" | "preview";
  setView: (view: "builder" | "preview") => void;
};

export const useDocumentBuilderStore = create<DocumentBuilderStore>(
  (set, get) => ({
    document: null,
    view: "builder",
    setView: (view) => set({ view }),
    setDocument: (document) => set({ document }),
    setDocumentValue: (key, value) => {
      const document = get().document;
      set({ document: { ...document, [key]: value } });
    },
  }),
);
