"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useDayPicker, useNavigation } from "react-day-picker";

interface CaptionSelectItem {
  label: string;
  value: string;
}

const DateInputCaption = () => {
  const { goToMonth, currentMonth } = useNavigation();
  const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
    useDayPicker();

  const years: CaptionSelectItem[] = useMemo(() => {
    const earliestYear =
      fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
    const latestYear =
      toYear || toMonth?.getFullYear() || toDate?.getFullYear();

    if (earliestYear && latestYear) {
      const yearsLength = latestYear - earliestYear + 1;
      return Array.from({ length: yearsLength }, (_, i) => ({
        label: DateTime.fromObject({ year: earliestYear + i }).toFormat("yyyy"),
        value: (earliestYear + i).toString(),
      }));
    }

    return [];
  }, [fromDate, fromMonth, fromYear, toDate, toMonth, toYear]);

  const months: CaptionSelectItem[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = DateTime.fromObject({ month: i + 1 });
      return {
        value: (i + 1).toString(),
        label: month.toLocaleString({ month: "long" }),
      };
    });
  }, []);

  const handleYearChange = (newYear: string) => {
    const newDate = DateTime.fromObject({
      year: Number.parseInt(newYear),
      month: currentMonth.getMonth() + 1,
    }).toJSDate();
    goToMonth(newDate);
  };

  const handleMonthChange = (newMonth: string) => {
    const newDate = DateTime.fromObject({
      year: currentMonth.getFullYear(),
      month: Number.parseInt(newMonth),
    }).toJSDate();
    goToMonth(newDate);
  };

  return (
    <div className="flex justify-center space-x-2">
      <Select
        value={(currentMonth.getMonth() + 1).toString()}
        onValueChange={handleMonthChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={currentMonth.getFullYear().toString()}
        onValueChange={handleYearChange}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateInputCaption;
