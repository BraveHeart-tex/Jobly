"use client";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { type PropsWithRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  format?: Intl.DateTimeFormatOptions;
  disabled?: boolean;
  showFutureDates?: boolean;
  showPastDates?: boolean;
  showTimeOptions?: boolean;
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
      showTimeOptions = false,
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
          {showTimeOptions && (
            <>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={DateTime.fromISO(value).toFormat("HH:mm")}
                onChange={(e) => {
                  if (!value) return;
                  const eventValue = e.target.value;
                  const hour = Number.parseInt(
                    eventValue.split(":")[0] as string,
                  );
                  const minute = Number.parseInt(
                    eventValue.split(":")[1] as string,
                  );

                  const isoDate = DateTime.fromISO(value)
                    .set({
                      hour,
                      minute,
                    })
                    .toISO();
                  if (!isoDate) return;
                  onChange(isoDate);
                }}
              />
            </>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "DateInput";

export default DateInput;
