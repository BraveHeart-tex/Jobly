"use client";

import QuillEditor from "@/components/QuillEditor";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { generateEditorModules } from "@/lib/utils";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

type DocumentBuilderRichTextInputProps = {
  field: DocumentSectionField;
  renderLabel?: boolean;
  placeholder?: string;
};

const DocumentBuilderRichTextInput = ({
  field,
  renderLabel = true,
  placeholder = "",
}: DocumentBuilderRichTextInputProps) => {
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const setFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );
  const value = getFieldValueByFieldId(field?.id)?.value ?? "";

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col gap-2">
        {renderLabel ? (
          <Label className="text-foreground/80 font-normal w-full text-left">
            {field?.fieldName}
          </Label>
        ) : null}
        <QuillEditor
          modules={generateEditorModules({
            formatting: ["bold", "italic", "underline", "strike"],
            lists: true,
            links: true,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(value) => {
            setFieldValueByFieldId(field?.id, value);
          }}
        />
      </div>
    </div>
  );
};

export default DocumentBuilderRichTextInput;
