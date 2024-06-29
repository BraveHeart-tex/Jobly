import type {
  Document,
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
import type { User } from "lucia";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type DocumentBuilderStoreInitParam = {
  document: Document;
  sections: Section[];
  fields: SectionField[];
  fieldValues: SectionFieldValue[];
};

type DocumentBuilderStore = {
  initializeState: (
    user: User,
    initialState: DocumentBuilderStoreInitParam,
  ) => void;
  view: "builder" | "preview";
  setView: (view: "builder" | "preview") => void;
  document: Document;
  setDocumentObject: (document: Document) => void;
  setDocumentValue: <K extends keyof Document>(
    key: K,
    value: Document[K],
  ) => void;
  sections: Section[];
  fields: SectionField[];
  fieldValues: SectionFieldValue[];
  getFieldValueByFieldId: (
    fieldId: SectionField["id"],
  ) => SectionFieldValue["value"];
  setFieldValueByFieldId: (
    fieldId: SectionField["id"],
    newValue: string,
  ) => void;
};

const getPredefinedDocumentSections = ({
  user,
  document,
}: { user: User; document: Document }): DocumentBuilderStoreInitParam => {
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
      initializeState: (
        user: User,
        initialState: DocumentBuilderStoreInitParam,
      ) => {
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
          set(predefined);
        } else {
          set({
            sections,
            fieldValues,
            fields,
            document: initialDocument,
          });
        }
      },
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
      fields: [],
      fieldValues: [],
      getFieldValueByFieldId: (fieldId: SectionField["id"]) => {
        return (
          get().fieldValues.find((fieldValue) => fieldValue.fieldId === fieldId)
            ?.value ?? ""
        );
      },
      setFieldValueByFieldId: (
        fieldId: SectionField["id"],
        newValue: string,
      ) => {
        const newFieldValues = get().fieldValues.map((fieldValue) => {
          if (fieldValue.fieldId === fieldId) {
            fieldValue.value = newValue;
          }
          return fieldValue;
        });

        set({
          fieldValues: newFieldValues,
        });
      },
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
