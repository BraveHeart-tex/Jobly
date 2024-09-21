"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import type React from "react";
import { type PropsWithRef, forwardRef } from "react";
import { Label } from "@/components/ui/label";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  format?: Intl.DateTimeFormatOptions;
  disabled?: boolean;
  showFutureDates?: boolean;
  showPastDates?: boolean;
  showTimeOptions?: boolean;
  fromYear?: number;
  toYear?: number;
}

const DateInput = forwardRef<PropsWithRef<HTMLButtonElement>, DateInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Select a date...",
      showFutureDates = true,
      showPastDates = true,
      disabled,
      showTimeOptions = false,
      format = DateTime.DATETIME_SHORT,
      fromYear = 1900,
      toYear = new Date().getFullYear(),
    },
    ref,
  ) => {
    const timeValue = value
      ? DateTime.fromISO(value).toFormat("HH:mm")
      : "00:00";

    const getHoursAndMinutesFromString = (value: string) => {
      const [hour, minute] = value.split(":") as [string, string];
      return {
        hour: Number.parseInt(hour),
        minute: Number.parseInt(minute),
      };
    };

    const handleTimeValueChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (!value) return;
      const eventValue = event.target.value;
      const { hour, minute } = getHoursAndMinutesFromString(eventValue);

      const isoDate = DateTime.fromISO(value)
        .set({
          hour,
          minute,
        })
        .toISO();
      if (!isoDate) return;
      onChange(isoDate);
    };

    const handleDateSelect = (date: Date | undefined) => {
      if (!date) return;
      const { hour, minute } = getHoursAndMinutesFromString(timeValue);
      const isoDate = DateTime.fromJSDate(date)
        .set({
          hour,
          minute,
        })
        .toISO();
      if (!isoDate) return;
      onChange(isoDate);
    };

    return (
      <Popover>
        <PopoverTrigger
          asChild
          ref={ref}
          disabled={disabled}
          className="focus-within:outline-none focus-within:ring-1 focus-within:ring-ring w-full"
        >
          <Button
            variant="outline"
            className={cn(
              "pl-3 text-left font-normal ",
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
            captionLayout="dropdown-buttons"
            fromYear={fromYear}
            toYear={toYear}
            mode="single"
            selected={value ? new Date(value) : new Date()}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (disabled !== undefined) return disabled;
              if (!date) return false;

              if (!showFutureDates && date > new Date()) {
                return true;
              }

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
                value={timeValue}
                onChange={handleTimeValueChange}
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
