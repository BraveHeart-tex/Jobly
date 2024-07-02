import type {
  Document,
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
import type { User } from "lucia";
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
  initializeState: (user: User, initialState: DocumentBuilderConfig) => void;
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

const getPredefinedDocumentSections = ({
  user,
  document,
}: { user: User; document: Document }): DocumentBuilderConfig => {
  if (document.type === "resume") {
    return {
      document,
      sections: [
        {
          id: 1,
          documentId: document.id,
          name: "Personal Details",
          displayOrder: 1,
        },
        {
          id: 2,
          documentId: document.id,
          name: "Professional Summary",
          displayOrder: 2,
        },
      ],
      fields: [
        {
          id: 1,
          sectionId: 1,
          fieldName: "Wanted Job Title",
          fieldType: "text",
        },
        {
          id: 2,
          sectionId: 1,
          fieldName: "First Name",
          fieldType: "text",
        },
        {
          id: 3,
          sectionId: 1,
          fieldName: "Last Name",
          fieldType: "text",
        },
        {
          id: 4,
          sectionId: 1,
          fieldName: "Email",
          fieldType: "text",
        },
        {
          id: 5,
          sectionId: 1,
          fieldName: "Phone",
          fieldType: "text",
        },
        {
          id: 6,
          sectionId: 1,
          fieldName: "Country",
          fieldType: "text",
        },
        {
          id: 7,
          sectionId: 1,
          fieldName: "City",
          fieldType: "text",
        },
        {
          id: 8,
          sectionId: 1,
          fieldName: "Address",
          fieldType: "text",
        },
        {
          id: 9,
          sectionId: 1,
          fieldName: "Postal Code",
          fieldType: "text",
        },
        {
          id: 10,
          sectionId: 1,
          fieldName: "Driving License",
          fieldType: "text",
        },
        {
          id: 11,
          sectionId: 1,
          fieldName: "Nationality",
          fieldType: "text",
        },
        {
          id: 12,
          sectionId: 1,
          fieldName: "Place of Birth",
          fieldType: "text",
        },
        {
          id: 13,
          sectionId: 1,
          fieldName: "Date of Birth",
          fieldType: "date",
        },
        {
          id: 14,
          sectionId: 2,
          fieldName: "Professional Summary",
          fieldType: "richText",
        },
      ],
      fieldValues: [
        {
          id: 1,
          fieldId: 2,
          value: user.firstName,
        },
        {
          id: 2,
          fieldId: 3,
          value: user.lastName,
        },
        {
          id: 3,
          fieldId: 4,
          value: user.email,
        },
        {
          id: 4,
          fieldId: 14,
          value: "",
        },
      ],
    };
  }

  // TODO: Handle cover_letter type
  return {
    document,
    sections: [],
    fields: [],
    fieldValues: [],
  };
};

export const useDocumentBuilderStore = create<
  DocumentBuilderStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      initialized: false,
      initializeState: (user: User, initialState: DocumentBuilderConfig) => {
        const {
          sections,
          document: initialDocument,
          fields,
          fieldValues,
        } = initialState;
        const isUpdated =
          new Date(initialDocument.updatedAt) >
          new Date(initialDocument.createdAt);

        if (sections.length === 0 && !isUpdated) {
          const predefined = getPredefinedDocumentSections({
            user,
            document: initialDocument,
          });
          set({
            ...predefined,
            initialized: true,
          });
        } else {
          set({
            sections,
            fieldValues,
            fields,
            document: initialDocument,
            initialized: true,
          });
        }
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
