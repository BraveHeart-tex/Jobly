"use client";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import type { DocumentBuilderConfig } from "@/lib/types";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { getFieldValue, transformDocumentBuilderData } from "./pdf.utils";
import CommaSeparatedText from "./CommaSeperatedText";

type LondonTemplateProps = {
  data: DocumentBuilderConfig;
};

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
    fontSize: 9,
  },
  documentDescription: {
    fontSize: 9,
    marginTop: 5,
    textAlign: "center",
  },
  section: {
    padding: 10,
    paddingTop: 5,
    width: "100%",
    borderTop: "1px solid #000",
  },
});

const LondonTemplate = ({ data }: LondonTemplateProps) => {
  const transformedData = transformDocumentBuilderData(data);
  const personalDetailsSection = transformedData.sections.find(
    (section) =>
      section.internalSectionTag === INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
  );
  const getPersonalDetailsSectionFieldValues = (fieldName: string) => {
    return getFieldValue(fieldName, personalDetailsSection?.fields);
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
              fontSize: 9,
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
