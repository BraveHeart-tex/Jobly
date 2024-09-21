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

const DateInputCaption = () => {
  const { goToMonth, currentMonth } = useNavigation();
  const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
    useDayPicker();

  const years = useMemo(() => {
    const currentYear = DateTime.now().year;
    return Array.from({ length: 10 }, (_, i) =>
      (currentYear - 5 + i).toString(),
    );
  }, []);

  const months = useMemo(() => {
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
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateInputCaption;
