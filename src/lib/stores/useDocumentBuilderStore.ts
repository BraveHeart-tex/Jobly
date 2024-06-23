import type { Document } from "@/server/db/schema";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type DocumentBuilderStore = {
  view: "builder" | "preview";
  setView: (view: "builder" | "preview") => void;
  document: Partial<Document> | null;
  setDocument: (document: Partial<Document> | null) => void;
  setDocumentValue: <K extends keyof Document>(
    key: K,
    value: Document[K],
  ) => void;
  documentData: Record<string, string>;
  setDocumentData: (key: string, data: unknown) => void;
};

export const useDocumentBuilderStore = create<
  DocumentBuilderStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      document: null,
      view: "builder",
      setView: (view) => set({ view }),
      setDocument: (document) => set({ document }),
      setDocumentValue: (key, value) => {
        const document = get().document;
        set({ document: { ...document, [key]: value } });
      },
      documentData: {},
      setDocumentData: (key: string, data: unknown) =>
        set({
          documentData: {
            ...get().documentData,
            [key]: data as string,
          },
        }),
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
