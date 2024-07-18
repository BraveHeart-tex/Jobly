import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import type { DocumentBuilderConfig } from "@/lib/types";
import type { SectionField } from "@/server/db/schema";
import { PDF_BODY_FONT_SIZE } from "./London/LondonTemplate";

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

/**
 * Styles links and cleans elements in the given HTML text generated by Quill Editor.
 */

// TODO: Call this when saving to db instead of the document itself
export const styleLinksAndCleanElements = (text: string): string => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(text, "text/html");
  const anchorTags = parsedDocument.querySelectorAll("a");
  const allElements = parsedDocument.body.querySelectorAll("*");

  const removeStyles = (styleString: string) => {
    const styleArray = styleString.split(";");
    const filteredStyles = styleArray.filter((style) => {
      return (
        !style.trim().startsWith("background-color: rgba") &&
        !style.trim().startsWith("color: rgba") &&
        !style.trim().startsWith("color: rgb")
      );
    });
    return filteredStyles.join(";");
  };

  for (const anchor of anchorTags) {
    anchor.style.cssText += `color: black; font-size: ${PDF_BODY_FONT_SIZE}px;`;
  }

  for (const element of allElements) {
    const currentStyle = element.getAttribute("style") || "";
    const cleanedStyle = removeStyles(currentStyle);
    element.setAttribute("style", cleanedStyle);
  }

  return parsedDocument.body.innerHTML;
};

export const getIfItemsShouldRender = <T extends Record<string, unknown>>(
  items: T[],
): boolean => {
  return (
    items.length > 0 &&
    items.some((item) => {
      const keys = Object.keys(item) as Array<keyof T>;
      return keys.filter((key) => key !== "id").some((key) => item[key]);
    })
  );
};

export const makeResumeTemplateData = (data: DocumentBuilderConfig) => {
  const transformedData = transformDocumentBuilderData(data);
  const getSectionByTag = (sectionTag: INTERNAL_SECTION_TAG) => {
    return transformedData.sections.find(
      (section) => section.internalSectionTag === sectionTag,
    );
  };
};
