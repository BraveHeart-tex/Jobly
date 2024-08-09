import { Text } from "@react-pdf/renderer";
import React from "react";

type CommaSeperatedTextProps = {
  style: Record<string, unknown>;
  fields: string[];
};

const CommaSeparatedText = ({ style, fields }: CommaSeperatedTextProps) => {
  const nonEmptyFields = fields.filter((field) => field.trim() !== "");

  return (
    <Text style={style}>
      {nonEmptyFields.map((field, index) => (
        <React.Fragment key={field}>
          {field}
          {index < nonEmptyFields.length - 1 && ", "}
        </React.Fragment>
      ))}
    </Text>
  );
};

export default CommaSeparatedText;
