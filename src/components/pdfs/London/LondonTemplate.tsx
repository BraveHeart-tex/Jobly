"use client";
import { EMPLOYMENT_SECTION_ITEMS_COUNT } from "@/app/home/employee/tools/_components/CvBuilderEmploymentHistorySection";
import { WEBSITES_SOCIAL_LINKS_SECTION_ITEMS_COUNT } from "@/app/home/employee/tools/_components/CvBuilderWebsitesAndLinks";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import type { DocumentBuilderConfig } from "@/lib/types";
import { groupEveryN, removeHTMLTags } from "@/lib/utils";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import CommaSeparatedText from "../CommaSeperatedText";
import {
  getFieldValue,
  styleLinksAndCleanElements,
  transformDocumentBuilderData,
} from "../pdf.utils";
import { EDUCATION_SECTION_ITEMS_COUNT } from "@/app/home/employee/tools/_components/CvBuilderEducationSection";
import type { HtmlRenderers } from "node_modules/react-pdf-html/dist/types/render";

export const PDF_BODY_FONT_SIZE = 9 as const;
const DOCUMENT_TITLE_FONT_SIZE = 13.4 as const;
const SECTION_LABEL_FONT_SIZE = 8.5 as const;

Font.register({
  family: "EB Garamond",
  fonts: [
    {
      src: "/fonts/EBGaramond-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/EBGaramond-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "/fonts/EBGaramond-Bold.ttf",
      fontWeight: 600,
    },
  ],
});

type LondonTemplateProps = {
  data: DocumentBuilderConfig;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "EB Garamond",
  },
  documentTitle: {
    fontSize: DOCUMENT_TITLE_FONT_SIZE,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  label: {
    fontSize: PDF_BODY_FONT_SIZE,
  },
  documentDescription: {
    fontSize: PDF_BODY_FONT_SIZE,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  link: {
    textDecoration: "underline",
    color: "black",
    fontSize: PDF_BODY_FONT_SIZE,
  },
  section: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 15,
    width: "100%",
    borderTop: "1px solid #000",
  },
  sectionLabel: {
    textTransform: "uppercase",
    fontSize: SECTION_LABEL_FONT_SIZE,
    letterSpacing: 1.1,
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const LondonTemplate = ({ data }: LondonTemplateProps) => {
  const transformedData = transformDocumentBuilderData(data);
  const personalDetailsSection = transformedData.sections.find(
    (section) =>
      section.internalSectionTag === INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
  );
  const professionalSummarySection = transformedData.sections.find(
    (section) =>
      section.internalSectionTag === INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
  );
  const websitesAndLinksSection = transformedData.sections.find(
    (section) =>
      section.internalSectionTag ===
      INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
  );
  const employmentHistorySection = transformedData.sections.find(
    (section) =>
      section.internalSectionTag === INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
  );
  const educationSection = transformedData.sections.find(
    (section) => section.internalSectionTag === INTERNAL_SECTION_TAGS.EDUCATION,
  );

  const getPersonalDetailsSectionFieldValues = (fieldName: string) => {
    return getFieldValue(fieldName, personalDetailsSection?.fields);
  };

  const getProfessionalSummarySectionFieldValues = (fieldName: string) => {
    return getFieldValue(fieldName, professionalSummarySection?.fields);
  };

  const firstName = getPersonalDetailsSectionFieldValues("First Name");
  const lastName = getPersonalDetailsSectionFieldValues("Last Name");
  const jobTitle = getPersonalDetailsSectionFieldValues("Wanted Job Title");
  const address = getPersonalDetailsSectionFieldValues("Address");
  const city = getPersonalDetailsSectionFieldValues("City");
  const postalCode = getPersonalDetailsSectionFieldValues("Postal Code");
  const placeOfBirth = getPersonalDetailsSectionFieldValues("Place of Birth");
  const phone = getPersonalDetailsSectionFieldValues("Phone");
  const email = getPersonalDetailsSectionFieldValues("Email");
  const driversLicense =
    getPersonalDetailsSectionFieldValues("Driving License");
  const dateOfBirth = getPersonalDetailsSectionFieldValues("Date of Birth");
  const professionalSummary = getProfessionalSummarySectionFieldValues(
    "Professional Summary",
  );

  const websitesAndLinks = groupEveryN(
    websitesAndLinksSection?.fields || [],
    WEBSITES_SOCIAL_LINKS_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      label: group[0]?.value,
      link: group[1]?.value,
    };
  });
  const shouldRenderWebsitesAndLinks =
    websitesAndLinks.length > 0 && websitesAndLinks.some((item) => item.label);

  const employementHistoryItems = groupEveryN(
    employmentHistorySection?.fields || [],
    EMPLOYMENT_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      jobTitle: group[0]?.value,
      startDate: group[1]?.value,
      endDate: group[2]?.value,
      employer: group[3]?.value,
      city: group[4]?.value,
      description: group[5]?.value,
    };
  });

  const shouldRenderEmployementHistoryItems =
    employementHistoryItems.length > 0 &&
    employementHistoryItems.some((item) => {
      const keys = Object.keys(item) as Array<keyof typeof item>;
      return keys.filter((key) => key !== "id").some((key) => item[key]);
    });

  const educationSectionItems = groupEveryN(
    educationSection?.fields || [],
    EDUCATION_SECTION_ITEMS_COUNT,
  ).map((group) => {
    return {
      id: crypto.randomUUID(),
      school: group[0]?.value,
      degree: group[1]?.value,
      startDate: group[2]?.value,
      endDate: group[3]?.value,
      city: group[4]?.value,
      description: group[5]?.value,
    };
  });

  const shouldRenderEducationSectionItems =
    educationSectionItems.length > 0 &&
    educationSectionItems.some((item) => {
      const keys = Object.keys(item) as Array<keyof typeof item>;
      return keys.filter((key) => key !== "id").some((key) => item[key]);
    });

  const htmlRenderers: HtmlRenderers = {
    ol: (props) => (
      <View
        {...props}
        style={{
          ...props.style,
          marginLeft: 0,
        }}
      >
        {props.children}
      </View>
    ),
    ul: (props) => (
      <View
        {...props}
        style={{
          ...props.style,
          marginLeft: 0,
        }}
      >
        {props.children}
      </View>
    ),
    a: (props) => (
      <Link
        {...props}
        style={{
          ...props.style,
          color: "black",
        }}
      >
        {props.children}
      </Link>
    ),
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.documentTitle}>
          {firstName} {lastName}
          {jobTitle ? `, ${jobTitle}` : null}
        </Text>
        <CommaSeparatedText
          style={styles.documentDescription}
          fields={[address, city, postalCode, placeOfBirth, phone, email]}
        />
        <TwoColumnLayout
          items={[
            {
              label: "Date of birth",
              value: dateOfBirth,
            },
            {
              label: "Driving License",
              value: driversLicense,
            },
            {
              label: "Place of birth",
              value: placeOfBirth,
            },
          ]}
        />
        {/* Websites and links */}
        {shouldRenderWebsitesAndLinks ? (
          <View style={styles.section}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionLabel}>
                {websitesAndLinksSection?.name}
              </Text>
              <View
                style={{
                  width: "75%",
                  fontSize: PDF_BODY_FONT_SIZE,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                {websitesAndLinks.map((item, index) => (
                  <Link src={item.link} key={item.link} style={styles.link}>
                    {item.label}
                    {index !== websitesAndLinks.length - 1 && ", "}
                  </Link>
                ))}
              </View>
            </View>
          </View>
        ) : null}

        {/* Professional Summary */}
        {removeHTMLTags(professionalSummary || "")?.length ? (
          <View style={styles.section}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  ...styles.sectionLabel,
                  height: "100%",
                }}
              >
                {professionalSummarySection?.name}
              </Text>
              <View
                style={{
                  width: "75%",
                }}
              >
                <Html
                  style={{
                    fontSize: PDF_BODY_FONT_SIZE,
                  }}
                  renderers={htmlRenderers}
                >
                  {styleLinksAndCleanElements(professionalSummary)}
                </Html>
              </View>
            </View>
          </View>
        ) : null}

        {/* EMPLOYMENT HISTORY */}
        {shouldRenderEmployementHistoryItems ? (
          <View
            style={{
              ...styles.section,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                ...styles.sectionLabel,
              }}
            >
              {employmentHistorySection?.name}
            </Text>

            <View
              style={{
                display: "flex",
              }}
            >
              {employementHistoryItems.map((item) => (
                <View key={item.id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      fontSize: PDF_BODY_FONT_SIZE,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        width: "30.5%",
                      }}
                    >
                      {item.startDate}
                      {item.endDate ? ` - ${item.endDate}` : null}
                    </Text>
                    <View
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "medium",
                          fontSize: 10.9,
                        }}
                      >
                        {item.jobTitle}
                        {item.employer ? ` - ${item.employer}` : null}
                      </Text>
                      <Html
                        style={{
                          fontSize: PDF_BODY_FONT_SIZE,
                          marginTop: -2,
                        }}
                        renderers={htmlRenderers}
                      >
                        {styleLinksAndCleanElements(item.description || "")}
                      </Html>
                    </View>
                    <Text
                      style={{
                        width: "10%",
                        textAlign: "right",
                      }}
                    >
                      {item.city}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* EDUCATION */}
        {shouldRenderEducationSectionItems ? (
          <View
            style={{
              ...styles.section,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                ...styles.sectionLabel,
              }}
            >
              {educationSection?.name}
            </Text>

            <View
              style={{
                display: "flex",
              }}
            >
              {educationSectionItems.map((item) => (
                <View key={item.id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      fontSize: PDF_BODY_FONT_SIZE,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        width: "30.5%",
                      }}
                    >
                      {item.startDate}
                      {item.endDate ? ` - ${item.endDate}` : null}
                    </Text>
                    <View
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "medium",
                          fontSize: 10.9,
                        }}
                      >
                        {item.degree}
                        {item.school
                          ? `${item.degree ? " - " : null}${item.school}`
                          : null}
                      </Text>

                      <Html
                        style={{
                          fontSize: PDF_BODY_FONT_SIZE,
                          marginTop: -2,
                          gap: 0,
                        }}
                        renderers={htmlRenderers}
                      >
                        {styleLinksAndCleanElements(item.description || "")}
                      </Html>
                    </View>
                    <Text
                      style={{
                        width: "10%",
                        textAlign: "right",
                      }}
                    >
                      {item.city}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

type TwoColumnLayoutProps = {
  items: { label: string; value: string }[];
};

const TwoColumnLayout = ({ items }: TwoColumnLayoutProps) => {
  const itemsWithValue = items.filter((item) => item.value);
  if (itemsWithValue.length === 0) return null;

  return (
    <View
      style={{
        ...styles.section,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 5,
          columnGap: 5,
        }}
      >
        {itemsWithValue.map((item) => (
          <View
            style={{
              width: "46%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: PDF_BODY_FONT_SIZE,
            }}
            key={item.label}
          >
            <Text>{item.label}</Text>
            <Text>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LondonTemplate;
