"use client";
import type { DocumentBuilderConfig } from "@/lib/types";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

type MyDocProps = {
  data: DocumentBuilderConfig;
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const MyDoc = (props: MyDocProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{props.data.document.title}</Text>
          <Text style={styles.text}>
            Email: john.doe@email.com | Phone: (123) 456-7890
          </Text>
          <Text style={styles.text}>Location: New York, NY</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Summary</Text>
          <Text style={styles.text}>
            Experienced software developer with a strong background in React and
            Node.js. Passionate about creating efficient and scalable web
            applications.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Experience</Text>
          <Text style={styles.text}>
            Software Developer | Tech Company Inc. | 2018 - Present
          </Text>
          <Text style={styles.text}>
            • Developed and maintained React-based web applications
          </Text>
          <Text style={styles.text}>
            • Collaborated with cross-functional teams to deliver high-quality
            software
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Education</Text>
          <Text style={styles.text}>
            Bachelor of Science in Computer Science | University Name | 2014 -
            2018
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Skills</Text>
          <Text style={styles.text}>
            JavaScript, React, Node.js, HTML, CSS, Git
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

export default MyDoc;
