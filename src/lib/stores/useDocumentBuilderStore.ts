import type {
  Document,
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type DocumentBuilderStore = {
  view: "builder" | "preview";
  setView: (view: "builder" | "preview") => void;
  document: Document;
  setDocumentObject: (document: Document) => void;
  setDocumentValue: <K extends keyof Document>(
    key: K,
    value: Document[K],
  ) => void;
  sections: Section[];
  setSections: (sections: Section[]) => void;
  fields: SectionField[];
  setFields: (fields: SectionField[]) => void;
  fieldValues: SectionFieldValue[];
  setFieldValues: (fieldValues: SectionFieldValue[]) => void;
};

export const useDocumentBuilderStore = create<
  DocumentBuilderStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      view: "builder",
      setView: (view) => set({ view }),
      document: {} as Document,
      setDocumentObject: (document) => {
        set({ document });
      },
      setDocumentValue: (key, value) => {
        set({
          document: {
            ...get().document,
            [key]: value,
          },
        });
      },
      sections: [],
      setSections: (sections) => {
        set({ sections });
      },
      fields: [],
      setFields: (fields) => set({ fields }),
      fieldValues: [],
      setFieldValues: (fieldValues) => set({ fieldValues }),
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
