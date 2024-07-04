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
};

type DocumentBuilderStore = DocumentBuilderState & DocumentBuilderActions;

export const useDocumentBuilderStore = create<
  DocumentBuilderStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      initialized: false,
      initializeState: (initialState: DocumentBuilderConfig) => {
        set({
          ...initialState,
          initialized: true,
        });
      },
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
      },
      fields: [],
      fieldValues: [],
      getFieldValueByFieldId: (fieldId: SectionField["id"]) => {
        return get().fieldValues.find(
          (fieldValue) => fieldValue.fieldId === fieldId,
        );
      },
      setFieldValueByFieldId: (
        fieldId: SectionField["id"],
        newValue: string,
      ) => {
        set({
          fieldValues: get().fieldValues.map((fieldValue) => ({
            ...fieldValue,
            value: fieldValue.fieldId === fieldId ? newValue : fieldValue.value,
          })),
        });
      },
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
