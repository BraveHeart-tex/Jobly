"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";

type DocumentBuilderInputProps = {
  label?: string;
  doNotRenderLabel?: boolean;
} & (
  | { field: SectionField; value?: never; onChange?: never }
  | { field?: never; value: string; onChange: (value: string) => void }
);

const DocumentBuilderInput = ({
  field,
  label,
  value = "",
  onChange,
  doNotRenderLabel = false,
}: DocumentBuilderInputProps) => {
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const setFieldValue = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );
  const fieldValueObject = field ? getFieldValueByFieldId(field?.id) : null;
  const inputValue = fieldValueObject?.value ?? value;

  const setValue = (value: string) => {
    if (field?.id) {
      setFieldValue(field?.id, value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-full",
        doNotRenderLabel && "pt-[21px]",
      )}
    >
      {doNotRenderLabel ? null : (
        <Label className="text-foreground/80 font-normal">
          {field?.fieldName || label}
        </Label>
      )}
      <Input
        value={inputValue}
        defaultValue={inputValue}
        className="w-full rounded-[2px] px-4 py-3 bg-muted/30 text-muted-foreground"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DocumentBuilderInput;
