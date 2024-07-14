"use client";
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
import CommaSeparatedText from "./CommaSeperatedText";
import {
  getFieldValue,
  styleLinksAndCleanElements,
  transformDocumentBuilderData,
} from "./pdf.utils";

export const PDF_BODY_FONT_SIZE = 9 as const;

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
    fontSize: 13.4,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    fontSize: PDF_BODY_FONT_SIZE,
  },
  documentDescription: {
    fontSize: PDF_BODY_FONT_SIZE,
    marginTop: 5,
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
    fontSize: 8.5,
    letterSpacing: 1.1,
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.documentTitle}>
          {firstName} {lastName}, {jobTitle}
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
        {websitesAndLinks.length > 0 ? (
          <View style={styles.section}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionLabel}>Links</Text>
              <View
                style={{
                  width: "75%",
                  fontSize: PDF_BODY_FONT_SIZE,
                }}
              >
                {websitesAndLinks.map((item) => (
                  <Link src={item.link} key={item.link} style={styles.link}>
                    {item.label}
                  </Link>
                ))}
              </View>
            </View>
          </View>
        ) : null}
        {removeHTMLTags(professionalSummary || "")?.length ? (
          <View style={styles.section}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionLabel}>Profile</Text>
              <View
                style={{
                  width: "75%",
                }}
              >
                <Html
                  style={{
                    fontSize: PDF_BODY_FONT_SIZE,
                  }}
                >
                  {styleLinksAndCleanElements(professionalSummary)}
                </Html>
              </View>
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
