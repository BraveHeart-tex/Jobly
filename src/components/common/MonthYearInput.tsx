import { DateTime } from "luxon";
import Combobox from "./Combobox";
import { cn } from "@/lib/utils";

interface MonthYearInputProps {
  label?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const MonthYearInput = ({
  label,
  value,
  onChange,
  disabled,
}: MonthYearInputProps) => {
  const dateValue = DateTime.fromISO(value || DateTime.now().toISO());
  const month = dateValue.month;
  const year = dateValue.year;

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = DateTime.fromObject({ month: i + 1 });
    return {
      value: (i + 1).toString(),
      label: month.toLocaleString({ month: "long" }),
    };
  });

  const years = Array.from({ length: 100 }, (_, i) => {
    return {
      value: (DateTime.now().year - i).toString(),
      label: (DateTime.now().year - i).toString(),
    };
  });

  const handleMonthChange = (monthValue: string) => {
    const newDate = DateTime.fromObject({
      year,
      month: Number.parseInt(monthValue),
      day: 1,
    }).toISODate();
    if (!newDate) return;
    onChange(newDate);
  };

  const handleYearChange = (yearValue: string) => {
    const newDate = DateTime.fromObject({
      year: Number.parseInt(yearValue),
      month,
      day: 1,
    }).toISODate();
    if (!newDate) return;
    onChange(newDate);
  };

  return (
    <div
      className={cn(
        "w-full grid grid-cols-2 gap-2",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <Combobox
        label={label}
        options={months}
        onChange={handleMonthChange}
        value={value ? month.toString() : ""}
        placeholder="Select a month"
      />
      <Combobox
        options={years}
        onChange={handleYearChange}
        value={value ? year.toString() : ""}
        placeholder="Select a year"
      />
    </div>
  );
};

export default MonthYearInput;
