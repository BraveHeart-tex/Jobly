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

type SaveDocumentDetailsParams = Partial<DocumentBuilderConfig>;

type DocumentBuilderState = {
  initialized: boolean;
  document: Document;
  sections: Section[];
  fields: SectionField[];
  fieldValues: SectionFieldValue[];
  saveDocumentDetailsFn: (documentData: SaveDocumentDetailsParams) => unknown;
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
    fn: (documentData: SaveDocumentDetailsParams) => unknown,
  ) => void;
  callSaveDocumentDetailsFn: (data: SaveDocumentDetailsParams) => void;
  addSection: (section: Section) => void;
  addField: (field: SectionField) => void;
  addFieldValue: (fieldValue: SectionFieldValue) => void;
  removeFields: (fieldIds: SectionField["id"][]) => void;
  removeSection: (sectionId: Section["id"]) => void;
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
      callSaveDocumentDetailsFn: (data) => {
        get().saveDocumentDetailsFn(data);
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
        const document = get().document;
        document[key] = value;
        set({
          document,
        });
        get().callSaveDocumentDetailsFn({
          document,
        });
      },
      setSectionValue: ({ sectionId, key, value }) => {
        const sectionToUpdate = get().sections.find(
          (section) => section.id === sectionId,
        );
        if (!sectionToUpdate) return;
        sectionToUpdate[key] = value;
        set({
          sections: get().sections.map((section) => {
            if (section.id === sectionId) {
              return sectionToUpdate;
            }
            return section;
          }),
        });
        get().callSaveDocumentDetailsFn({
          sections: [sectionToUpdate],
        });
      },
      getFieldValueByFieldId: (fieldId) => {
        return get().fieldValues.find(
          (fieldValue) => fieldValue.fieldId === fieldId,
        );
      },
      setFieldValueByFieldId: (fieldId, newValue) => {
        const fieldValueToUpdate = get().fieldValues.find(
          (fieldValue) => fieldValue.fieldId === fieldId,
        );
        if (!fieldValueToUpdate) return;
        fieldValueToUpdate.value = newValue;

        set({
          fieldValues: get().fieldValues.map((fieldValue) => {
            if (fieldValue.fieldId === fieldId) {
              return fieldValueToUpdate;
            }
            return fieldValue;
          }),
        });

        get().callSaveDocumentDetailsFn({
          fieldValues: [fieldValueToUpdate],
        });
      },
      addSection: (section) => {
        set({ sections: [...get().sections, section] });
      },
      addField: (field) => {
        set({ fields: [...get().fields, field] });
      },
      addFieldValue: (fieldValue) => {
        set({ fieldValues: [...get().fieldValues, fieldValue] });
      },
      removeFields: (fieldIds) => {
        const newFields = get().fields.filter(
          (field) => !fieldIds.includes(field.id),
        );
        const newFieldValues = get().fieldValues.filter(
          (fieldValue) => !fieldIds.includes(fieldValue.fieldId),
        );
        set({ fields: newFields, fieldValues: newFieldValues });
      },
      removeSection: (sectionId) => {
        const newSections = get().sections.filter(
          (section) => section.id !== sectionId,
        );
        const newFields = get().fields.filter(
          (field) => field.sectionId !== sectionId,
        );
        const newFieldValues = get().fieldValues.filter((fieldValue) =>
          newFields.map((field) => field.id).includes(fieldValue.fieldId),
        );
        set({
          sections: newSections,
          fields: newFields,
          fieldValues: newFieldValues,
        });
      },
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
