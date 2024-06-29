"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Document } from "@/server/db/schema";

// TODO: Refactor props to handle section keys etc
type DocumentBuilderInputProps = {
  label: string;
  fieldName: keyof Document;
};

const DocumentBuilderInput = ({
  label,
  fieldName,
}: DocumentBuilderInputProps) => {
  const documentDataValue = useDocumentBuilderStore(
    (state) => state.document[fieldName],
  );
  const setDocumentDataValue = useDocumentBuilderStore(
    (state) => state.setDocumentValue,
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-foreground/80 font-normal">{label}</Label>
      <Input
        value={documentDataValue}
        className="w-full rounded-[2px] px-4 py-3 bg-muted/30 text-muted-foreground"
        onChange={(e) => {
          const newValue = e.target.value;
          setDocumentDataValue(fieldName, newValue);
        }}
      />
    </div>
  );
};

export default DocumentBuilderInput;
