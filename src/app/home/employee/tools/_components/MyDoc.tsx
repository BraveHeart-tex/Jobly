import { Document, Font, Page, Text } from "@react-pdf/renderer";

const MyDoc = () => (
  <Document>
    <Page size="A4">
      <Text>hello world</Text>
    </Page>
  </Document>
);

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

export default MyDoc;
