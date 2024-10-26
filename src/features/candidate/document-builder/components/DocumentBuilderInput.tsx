"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn } from "@/lib/utils";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import { useEffect, useRef } from "react";

interface DocumentBuilderInputProps {
  label?: string;
  doNotRenderLabel?: boolean;
  field?: DocumentSectionField;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
}

const DocumentBuilderInput = ({
  field,
  label,
  value = "",
  onChange,
  doNotRenderLabel = false,
  autoFocus = false,
}: DocumentBuilderInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const setFieldValue = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );
  const fieldValueObject = field ? getFieldValueByFieldId(field?.id) : null;

  const inputValue = value ? value : (fieldValueObject?.value ?? "");

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    if (!isMobile && inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

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
        "flex flex-col gap-2 w-full min-w-full",
        doNotRenderLabel && "pt-[21px]",
      )}
    >
      {doNotRenderLabel ? null : (
        <Label className="text-foreground/80 font-normal w-full text-left">
          {field?.fieldName || label}
        </Label>
      )}
      <Input
        ref={inputRef}
        value={inputValue}
        className="w-full rounded-[2px] px-4 py-3 bg-muted/30 text-muted-foreground"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DocumentBuilderInput;
