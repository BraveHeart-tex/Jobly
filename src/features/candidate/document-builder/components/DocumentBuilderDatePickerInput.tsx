"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { MONTHS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";

const CURRENT_MONTH = MONTHS[new Date().getMonth()] ?? "";
const CURRENT_YEAR = new Date().getFullYear();

const getMonthFromFieldValue = (fieldValue: string) => {
  return fieldValue.split(" ")[0];
};
const getYearFromFieldValue = (fieldValue: string) => {
  return Number.parseInt(fieldValue.split(" ")[1] as string);
};

interface DocumentBuilderDatePickerInputProps {
  field: DocumentSectionField;
  showPresentToggle?: boolean;
  presentToggleLabel?: string;
}

const DocumentBuilderDatePickerInput = ({
  field,
  showPresentToggle = true,
  presentToggleLabel = "Present",
}: DocumentBuilderDatePickerInputProps) => {
  const fieldValue = field.value;
  const isFieldValuePresent = fieldValue === "Present";
  const setFieldValue = useDocumentBuilderStore((state) => state.setFieldValue);
  const [year, setYear] = useState(
    fieldValue && !isFieldValuePresent
      ? getYearFromFieldValue(fieldValue)
      : CURRENT_YEAR,
  );
  const [month, setMonth] = useState(
    fieldValue && !isFieldValuePresent
      ? getMonthFromFieldValue(fieldValue)
      : CURRENT_MONTH,
  );
  const [open, setOpen] = useState(false);
  const [isPresent, setIsPresent] = useState(isFieldValuePresent);
  const label = field?.fieldName;

  const handleCheckedChange = (checked: boolean) => {
    setIsPresent(checked);
    if (checked) {
      setYear(CURRENT_YEAR);
      setMonth(CURRENT_MONTH);
      setFieldValue(field?.id, "Present");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={(e) => {
          e.preventDefault();
          if (open) return;
          setOpen(true);
        }}
      >
        <DocumentBuilderInput
          label={label}
          value={fieldValue as string}
          onChange={() => {}}
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 rounded-md">
        <div className="grid gap-2">
          <div className="w-full flex items-center justify-between">
            <Button
              size="icon"
              variant="ghost"
              disabled={isPresent}
              onClick={() => {
                setYear(year - 1);
                setFieldValue(field?.id, `${month} ${year - 1}`);
              }}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="text-sm rounded-md text-primary-foreground bg-primary py-1 px-2 tabular-nums">
              {year}
            </span>
            <Button
              size="icon"
              variant="ghost"
              disabled={isPresent}
              onClick={() => {
                setYear(year + 1);
                setFieldValue(field?.id, `${month} ${year + 1}`);
              }}
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 mx-auto w-full place-items-center">
            {MONTHS.map((monthItem) => (
              <Button
                variant={month === monthItem ? "default" : "ghost"}
                className="h-8"
                key={monthItem}
                disabled={isPresent}
                onClick={() => {
                  setMonth(monthItem);
                  setFieldValue(field?.id, `${monthItem} ${year}`);
                }}
              >
                <p>{monthItem}</p>
              </Button>
            ))}
          </div>
          <div className="w-full flex items-center gap-1 mt-4 justify-between">
            {showPresentToggle ? (
              <div className="flex items-center gap-1">
                <Switch
                  checked={isPresent}
                  onCheckedChange={handleCheckedChange}
                />
                <Label className="text-sm">{presentToggleLabel}</Label>
              </div>
            ) : null}
            <Button
              variant="outline"
              className="self-end ml-auto"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DocumentBuilderDatePickerInput;
