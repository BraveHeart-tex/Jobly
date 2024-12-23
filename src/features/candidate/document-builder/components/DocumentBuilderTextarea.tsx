import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

interface DocumentBuilderTextareaProps {
  field: DocumentSectionField;
  placeholder?: string;
}

const DocumentBuilderTextarea = ({
  field,
  placeholder,
}: DocumentBuilderTextareaProps) => {
  const setFieldValue = useDocumentBuilderStore((state) => state.setFieldValue);

  const inputValue = field?.value || "";

  return (
    <div className="flex flex-col gap-2 w-full min-w-full">
      <Label className="text-foreground/80 font-normal w-full text-left">
        {field?.fieldName}
      </Label>
      <Textarea
        defaultValue={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setFieldValue(field?.id, e.target.value);
        }}
        className="w-full rounded-[2px] px-4 py-3 bg-muted/30 text-muted-foreground resize-none"
        rows={5}
      />
    </div>
  );
};
export default DocumentBuilderTextarea;
