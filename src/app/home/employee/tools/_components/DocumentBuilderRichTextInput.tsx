"use client";

import QuillEditor from "@/components/QuillEditor";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { generateEditorModules } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";

type DocumentBuilderRichTextInputProps = {
  field: SectionField;
  renderLabel?: boolean;
};

const DocumentBuilderRichTextInput = ({
  field,
  renderLabel = true,
}: DocumentBuilderRichTextInputProps) => {
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const setFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );
  const value = getFieldValueByFieldId(field.id)?.value ?? "";

  return (
    <div className="flex flex-col gap-2">
      {renderLabel ? (
        <Label className="text-foreground/80 font-normal w-full text-left">
          {field.fieldName}
        </Label>
      ) : null}
      <QuillEditor
        modules={generateEditorModules({
          formatting: ["bold", "italic", "underline", "strike"],
          lists: true,
          links: true,
        })}
        value={value}
        onChange={(value) => {
          setFieldValueByFieldId(field.id, value);
        }}
      />
    </div>
  );
};

export default DocumentBuilderRichTextInput;
