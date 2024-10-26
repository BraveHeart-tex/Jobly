"use client";

import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

interface DocumentBuilderRichTextInputProps {
  field: DocumentSectionField;
  renderLabel?: boolean;
  placeholder?: string;
}

const DocumentBuilderRichTextInput = ({
  field,
  renderLabel = true,
  placeholder = "",
}: DocumentBuilderRichTextInputProps) => {
  const setFieldValue = useDocumentBuilderStore((state) => state.setFieldValue);
  const value = field.value ?? "";

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col gap-2">
        {renderLabel ? (
          <Label className="text-foreground/80 font-normal w-full text-left">
            {field?.fieldName}
          </Label>
        ) : null}
        <RichTextEditor
          placeholder={placeholder}
          initialValue={value}
          onChange={(html) => {
            setFieldValue(field?.id, html);
          }}
        />
      </div>
    </div>
  );
};

export default DocumentBuilderRichTextInput;
