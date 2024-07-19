"use client";
import { parseSectionMetadata, removeHTMLTags } from "@/lib/utils";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { HtmlRenderers } from "node_modules/react-pdf-html/dist/types/render";
import Html from "react-pdf-html";
import CommaSeparatedText from "../CommaSeperatedText";
import {
  type makeResumeTemplateData,
  styleLinksAndCleanElements,
} from "../pdf.utils";

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
  data: ReturnType<typeof makeResumeTemplateData>;
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
  const {
    personalDetailsSection,
    extraCurricularActivitiesSection,
    referencesSection,
    internshipsSection,
    professionalSummarySection,
    skillsSection,
    educationSection,
    employmentHistorySection,
    websitesAndLinksSection,
    languagesSection,
    hobbiesSection,
    coursesSection,
  } = data;
  const {
    firstName,
    city,
    driversLicense,
    email,
    jobTitle,
    placeOfBirth,
    dateOfBirth,
    lastName,
    address,
    postalCode,
    phone,
  } = personalDetailsSection;
  const { shouldRenderWebsitesAndLinks, websitesAndLinks } =
    websitesAndLinksSection;
  const { professionalSummary } = professionalSummarySection;
  const { shouldRenderEmploymentHistoryItems, employmentHistoryItems } =
    employmentHistorySection;
  const { shouldRenderEducationSectionItems, educationSectionItems } =
    educationSection;
  const { shouldRenderSkillsSectionItems, skillsSectionItems } = skillsSection;
  const { internshipsSectionItems, shouldRenderInternshipSectionItems } =
    internshipsSection;
  const { shouldRenderReferencesSectionItems, referencesSectionItems } =
    referencesSection;
  const { shouldRenderHobbiesSectionItems, hobbies } = hobbiesSection;
  const { shouldRenderLanguagesSectionItems, languagesSectionItems } =
    languagesSection;
  const { coursesSectionItems, shouldRenderCoursesSectionItems } =
    coursesSection;
  const {
    shouldRenderExtraCurricularActivitiesSectionItems,
    extraCurricularActivitiesSectionItems,
  } = extraCurricularActivitiesSection;

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
        {shouldRenderEmploymentHistoryItems ? (
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
              {employmentHistoryItems.map((item) => (
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
                        width: "82%",
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
                        width: "82%",
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
                          ? `${item.degree ? " - " : ""}${item.school}`
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
        {/* Skills */}
        {shouldRenderSkillsSectionItems ? (
          <View
            style={{
              ...styles.section,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...styles.sectionLabel,
                  width: "25%",
                }}
              >
                {skillsSection?.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  gap: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  columnGap: 5,
                  width: "75%",
                }}
              >
                {skillsSectionItems.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      fontSize: PDF_BODY_FONT_SIZE,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "46%",
                    }}
                  >
                    <Text>{item.name}</Text>
                    {parseSectionMetadata(skillsSection?.metadata)
                      .showExperienceLevel ? (
                      <Text>{item.level}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : null}

        {shouldRenderInternshipSectionItems ? (
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
              {internshipsSection?.name}
            </Text>

            <View
              style={{
                display: "flex",
              }}
            >
              {internshipsSectionItems.map((item) => (
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
                      {item.endDate ? ` - ${item.endDate}` : ""}
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
                        {item.employer ? ` - ${item.employer}` : ""}
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
        {shouldRenderReferencesSectionItems ? (
          <View
            style={{
              ...styles.section,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...styles.sectionLabel,
                height: "100%",
                width: "25%",
              }}
            >
              {referencesSection?.name}
            </Text>
            <View
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: "75%",
              }}
            >
              {parseSectionMetadata(referencesSection?.metadata)
                .hideReferences ? (
                <Text
                  style={{
                    fontSize: 10.9,
                  }}
                >
                  References available upon request
                </Text>
              ) : (
                <>
                  {referencesSectionItems.map(
                    ({
                      id,
                      referentPhone,
                      referentCompany,
                      referentEmail,
                      referentFullName,
                    }) => (
                      <View
                        key={id}
                        style={{
                          fontSize: PDF_BODY_FONT_SIZE,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10.9,
                          }}
                        >
                          {referentFullName}
                          {referentCompany ? ` from ${referentCompany}` : ""}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            gap: 4,
                          }}
                        >
                          <Text>{referentEmail}</Text>
                          <Text>
                            {referentEmail && referentPhone ? "- " : ""}
                            {referentPhone}
                          </Text>
                        </View>
                      </View>
                    ),
                  )}
                </>
              )}
            </View>
          </View>
        ) : null}
        {shouldRenderHobbiesSectionItems ? (
          <View
            style={{
              ...styles.section,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...styles.sectionLabel,
                height: "100%",
                width: "25%",
              }}
            >
              {hobbiesSection?.name}
            </Text>
            <Text
              style={{
                width: "75%",
                fontSize: PDF_BODY_FONT_SIZE,
              }}
            >
              {hobbies}
            </Text>
          </View>
        ) : null}
        {shouldRenderLanguagesSectionItems ? (
          <View
            style={{
              ...styles.section,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...styles.sectionLabel,
                  width: "25%",
                }}
              >
                {languagesSection?.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  gap: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  columnGap: 5,
                  width: "75%",
                }}
              >
                {languagesSectionItems.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      fontSize: PDF_BODY_FONT_SIZE,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "46%",
                    }}
                  >
                    <Text>{item.language}</Text>
                    <Text>{item.level}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : null}
        {shouldRenderCoursesSectionItems ? (
          <View
            style={{
              ...styles.section,
              display: "flex",
              flexDirection:
                coursesSectionItems.length === 1 &&
                coursesSectionItems.every(
                  (item) => !item.startDate && !item.endDate,
                )
                  ? "row"
                  : "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                ...styles.sectionLabel,
                width: "23%",
              }}
            >
              {coursesSection?.name}
            </Text>
            <View
              style={{
                display: "flex",
                gap: 10,
                width: "98%",
              }}
            >
              {coursesSectionItems.map((item) => (
                <View key={item.id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: PDF_BODY_FONT_SIZE,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        width:
                          coursesSectionItems.length === 1 &&
                          coursesSectionItems.every(
                            (item) => !item.startDate && !item.endDate,
                          )
                            ? "0%"
                            : "33%",
                      }}
                    >
                      {item.startDate}
                      {item.endDate ? ` - ${item.endDate}` : ""}
                    </Text>
                    <View
                      style={{
                        width: "96%",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "medium",
                          fontSize: 10.9,
                        }}
                      >
                        {item.course}
                        {item.institution
                          ? `${item.course ? " -" : ""} ${item.institution}`
                          : null}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {shouldRenderExtraCurricularActivitiesSectionItems ? (
          <View
            style={{
              ...styles.section,
              display: "flex",
              flexDirection:
                extraCurricularActivitiesSectionItems.length === 1 &&
                extraCurricularActivitiesSectionItems.every(
                  (item) => !item.startDate && !item.endDate,
                )
                  ? "row"
                  : "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                ...styles.sectionLabel,
                width:
                  extraCurricularActivitiesSectionItems.length === 1 &&
                  extraCurricularActivitiesSectionItems.every(
                    (item) => !item.startDate && !item.endDate,
                  )
                    ? styles.sectionLabel.width
                    : "100%",
              }}
            >
              {extraCurricularActivitiesSection?.name}
            </Text>
            <View
              style={{
                display: "flex",
                gap: 7,
                width:
                  extraCurricularActivitiesSectionItems.length === 1 &&
                  extraCurricularActivitiesSectionItems.every(
                    (item) => !item.startDate && !item.endDate,
                  )
                    ? "96%"
                    : "99%",
              }}
            >
              {extraCurricularActivitiesSectionItems.map((item) => (
                <View key={item.id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: PDF_BODY_FONT_SIZE,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        width:
                          extraCurricularActivitiesSectionItems.length === 1 &&
                          extraCurricularActivitiesSectionItems.every(
                            (item) => !item.startDate && !item.endDate,
                          )
                            ? "0%"
                            : "33%",
                      }}
                    >
                      {item.startDate}
                      {item.endDate ? ` - ${item.endDate}` : ""}
                    </Text>
                    <View
                      style={{
                        width: "96%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "medium",
                            fontSize: 10.9,
                          }}
                        >
                          {item.functionTitle}
                          {item.employer
                            ? `${item.functionTitle ? " -" : ""} ${item.employer}`
                            : ""}
                        </Text>
                        <Text
                          style={{
                            fontSize: PDF_BODY_FONT_SIZE,
                          }}
                        >
                          {item.city}
                        </Text>
                      </View>
                      <Html
                        style={{ fontSize: PDF_BODY_FONT_SIZE }}
                        renderers={htmlRenderers}
                      >
                        {styleLinksAndCleanElements(item.description || "")}
                      </Html>
                    </View>
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
