"use client";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { type PropsWithRef, forwardRef } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  format?: Intl.DateTimeFormatOptions;
  disabled?: boolean;
  showFutureDates?: boolean;
  showPastDates?: boolean;
}

const DateInput = forwardRef<PropsWithRef<HTMLButtonElement>, DateInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      showFutureDates,
      showPastDates,
      disabled,
      format = DateTime.DATETIME_SHORT,
    },
    ref,
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            ref={ref}
            className={cn(
              "pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value
              ? DateTime.fromISO(value).toLocaleString(format)
              : placeholder || ""}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={new Date(value)}
            onSelect={(date) => {
              if (!date) return;
              const isoDate = DateTime.fromJSDate(date).toISO();
              if (!isoDate) return;
              onChange(isoDate);
            }}
            disabled={(date) => {
              if (disabled !== undefined) return disabled;
              if (!date) return false;
              if (!showFutureDates && date > new Date()) return true;
              if (!showPastDates && date < new Date()) return true;
              return false;
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "DateInput";

export default DateInput;
