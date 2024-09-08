import { type PropsWithRef, forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
      <Select value={value} onValueChange={onChange} defaultValue={value}>
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
