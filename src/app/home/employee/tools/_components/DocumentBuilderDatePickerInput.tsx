"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import DocumentBuilderInput from "./DocumentBuilderInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MONTHS } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const CURRENT_MONTH = MONTHS[new Date().getMonth()] ?? "";
const CURRENT_YEAR = new Date().getFullYear();

type DocumentBuilderDatePickerInputProps = {
  label?: string;
  showPresentToggle?: boolean;
  presentToggleLabel?: string;
};

const DocumentBuilderDatePickerInput = ({
  label,
  showPresentToggle = true,
  presentToggleLabel = "Present",
}: DocumentBuilderDatePickerInputProps) => {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [open, setOpen] = useState(false);
  const [isPresent, setIsPresent] = useState(false);

  const handleCheckedChange = (checked: boolean) => {
    setIsPresent(checked);
    if (checked) {
      setYear(CURRENT_YEAR);
      setMonth(CURRENT_MONTH);
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
          value={isPresent ? "Present" : `${month} ${year}`}
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
              onClick={() => setYear(year - 1)}
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
              onClick={() => setYear(year + 1)}
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
                onClick={() => setMonth(monthItem)}
              >
                <p>{monthItem}</p>
              </Button>
            ))}
          </div>
          <div className="w-full flex items-center gap-1 mt-4 justify-between">
            {showPresentToggle ? (
              <div className="flex items-center gap-1">
                <Label className="text-sm">{presentToggleLabel}</Label>
                <Switch
                  checked={isPresent}
                  onCheckedChange={handleCheckedChange}
                />
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
