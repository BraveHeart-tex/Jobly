import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type PropsWithRef, forwardRef } from "react";

interface SelectInputProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const SelectInput = forwardRef<
  PropsWithRef<HTMLButtonElement>,
  SelectInputProps
>(
  (
    {
      options,
      placeholder = "Select an option...",
      value,
      onChange,
    }: SelectInputProps,
    ref,
  ) => {
    return (
      <Select key={value} defaultValue={value} onValueChange={onChange}>
        <SelectTrigger className="w-full" ref={ref}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);

export default SelectInput;
