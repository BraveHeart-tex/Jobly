import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

type DocumentBuilderSelectProps = {
  field: DocumentSectionField;
  placeholder?: string;
  options: { value: string; label: string }[];
};

const DocumentBuilderSelect = ({
  field,
  placeholder,
  options,
}: DocumentBuilderSelectProps) => {
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const setFieldValue = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );
  const fieldValueObject = getFieldValueByFieldId(field?.id);
  const value = fieldValueObject?.value || "";

  return (
    <div className="flex flex-col gap-2 w-full min-w-full">
      <Label className="text-foreground/80 font-normal w-full text-left">
        {field.fieldName}
      </Label>
      <Select
        value={value}
        onValueChange={(value) => setFieldValue(field.id, value)}
      >
        <SelectTrigger className="w-full rounded-[2px] px-4 py-3 bg-muted/30 text-muted-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="text-foreground/90">
          <SelectGroup>
            <SelectLabel>{field.fieldName}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default DocumentBuilderSelect;
