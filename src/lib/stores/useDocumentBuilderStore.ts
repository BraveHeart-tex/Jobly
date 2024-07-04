import type {
  Document,
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DocumentBuilderConfig } from "../types";

type SetSectionValueParams<K extends keyof Section> = {
  sectionId: Section["id"];
  key: K;
  value: Section[K];
};

type DocumentBuilderState = {
  initialized: boolean;
  document: Document;
  sections: Section[];
  fields: SectionField[];
  fieldValues: SectionFieldValue[];
  saveDocumentDetailsFn: (documentData: DocumentBuilderConfig) => unknown;
};

type DocumentBuilderActions = {
  initializeState: (initialState: DocumentBuilderConfig) => void;
  setDocumentObject: (document: Document) => void;
  setDocumentValue: <K extends keyof Document>(
    key: K,
    value: Document[K],
  ) => void;
  setSectionValue: <K extends keyof Section>(
    params: SetSectionValueParams<K>,
  ) => void;
  getFieldValueByFieldId: (
    fieldId: SectionField["id"],
  ) => SectionFieldValue | undefined;
  setFieldValueByFieldId: (
    fieldId: SectionField["id"],
    newValue: string,
  ) => void;
  setSaveDocumentDetailsFn: (
    fn: (documentData: DocumentBuilderConfig) => unknown,
  ) => void;
  callSaveDocumentDetailsFn: () => void;
};

type DocumentBuilderStore = DocumentBuilderState & DocumentBuilderActions;

export const useDocumentBuilderStore = create<
  DocumentBuilderStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      initialized: false,
      document: {} as Document,
      sections: [],
      fields: [],
      fieldValues: [],
      setSaveDocumentDetailsFn: (fn) => set({ saveDocumentDetailsFn: fn }),
      saveDocumentDetailsFn: () => {},
      callSaveDocumentDetailsFn: () => {
        const state = get();
        state.saveDocumentDetailsFn(state);
      },
      initializeState: (initialState) => {
        set({
          ...initialState,
          initialized: true,
        });
      },
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

        setTimeout(() => get().callSaveDocumentDetailsFn());
      },
      setSectionValue: ({ sectionId, key, value }) => {
        set({
          sections: get().sections.map((section) => {
            if (section.id === sectionId) {
              return {
                ...section,
                [key]: value,
              };
            }
            return section;
          }),
        });
        setTimeout(() => get().callSaveDocumentDetailsFn());
      },
      getFieldValueByFieldId: (fieldId) => {
        return get().fieldValues.find(
          (fieldValue) => fieldValue.fieldId === fieldId,
        );
      },
      setFieldValueByFieldId: (fieldId, newValue) => {
        set({
          fieldValues: get().fieldValues.map((fieldValue) => ({
            ...fieldValue,
            value: fieldValue.fieldId === fieldId ? newValue : fieldValue.value,
          })),
        });
        setTimeout(() => get().callSaveDocumentDetailsFn());
      },
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
