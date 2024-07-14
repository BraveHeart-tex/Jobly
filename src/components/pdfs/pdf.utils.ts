import type { DocumentBuilderConfig } from "@/lib/types";
import type { SectionField } from "@/server/db/schema";
import { PDF_BODY_FONT_SIZE } from "./LondonTemplate";

export type SectionFieldWithValue = SectionField & {
  value: string;
};

export const transformDocumentBuilderData = (data: DocumentBuilderConfig) => {
  const { document, sections, fields, fieldValues } = data;

  const mappedSections = sections.map((section) => {
    const sectionFields = fields
      .filter((field) => field.sectionId === section.id)
      .map((field) => {
        const fieldValue =
          fieldValues.find((value) => value.fieldId === field.id)?.value || "";
        return {
          ...field,
          value: fieldValue,
        };
      });

    return {
      ...section,
      fields: sectionFields,
    };
  });

  return {
    ...document,
    sections: mappedSections,
  };
};

export const getFieldValue = (
  fieldName: string,
  fields?: SectionFieldWithValue[],
) => {
  if (!fields) return "";
  return fields.find((field) => field.fieldName === fieldName)?.value || "";
};

export const applyInlineStylesToLinks = (text: string) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(text, "text/html");
  const anchorTags = parsedDocument.querySelectorAll("a");

  for (const anchor of anchorTags) {
    anchor.style.cssText += `color: black; font-size: ${PDF_BODY_FONT_SIZE}px;`;
  }

  return parsedDocument.body.innerHTML;
};
