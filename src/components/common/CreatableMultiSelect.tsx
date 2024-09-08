"use client";

import CreatableSelect from "react-select/creatable";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type React from "react";
import { forwardRef } from "react";

const generateOptions = (baseOptions: (string | number)[]): OptionType[] => {
  return baseOptions.map((value) => ({
    label: value.toString(),
    value: value.toString(),
  }));
};

const getNewValues = (newValues: OptionType[]): string[] => {
  return newValues.map((item) => item.value);
};

interface OptionType {
  value: string;
  label: string;
}

interface CreatableSelectProps {
  value: string[];
  placeholder?: string;
  className?: string;
  options: string[];
  onCreateOption?: (value: string) => void;
  onChange?: (newValues: string[]) => void;
}

const CreatableMultiSelect = forwardRef(
  (
    {
      value,
      placeholder,
      options,
      onCreateOption,
      onChange,
    }: CreatableSelectProps,
    ref,
  ) => {
    const mappedOptions = options.map((option) => ({
      label: option,
      value: option,
    }));
    const mappedValue = generateOptions(value);

    return (
      <CreatableSelect<OptionType, true>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ref={ref as any}
        isClearable
        isMulti
        onChange={(newValue) => {
          const newValues = getNewValues(newValue as OptionType[]);
          onChange?.(newValues);
        }}
        onCreateOption={onCreateOption}
        options={mappedOptions}
        value={mappedValue}
        placeholder={placeholder}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              isFocused && "ring-1 ring-ring",
            ),
          valueContainer: () => "h-full",
          singleValue: () => "text-foreground",
          input: () => "text-foreground",
          menu: () =>
            "mt-2 rounded-md border bg-popover text-popover-foreground shadow-md w-full",
          option: ({ isFocused, isSelected }) =>
            cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
              isFocused && "bg-accent text-accent-foreground",
              isSelected && "bg-primary text-primary-foreground",
            ),
          noOptionsMessage: () => "text-muted-foreground p-2",
          placeholder: () => "text-muted-foreground",
        }}
        unstyled
        components={{
          IndicatorSeparator: () => null,
          MultiValue: ({ data, removeProps }) => (
            <Badge variant="secondary" className="mr-1 mb-1">
              {(data as OptionType).label}
              <XIcon
                size={14}
                className="ml-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (removeProps.onClick) {
                    removeProps.onClick(
                      e as unknown as React.MouseEvent<
                        HTMLDivElement,
                        MouseEvent
                      >,
                    );
                  }
                }}
              />
            </Badge>
          ),
          ClearIndicator: ({ ...props }) => (
            <Button
              type="button"
              variant="ghost"
              className="h-full w-max p-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.clearValue();
              }}
            >
              <XIcon size={16} />
            </Button>
          ),
          DropdownIndicator: ({ selectProps }) => {
            const isOpen = selectProps.menuIsOpen;
            return (
              <Button
                type="button"
                variant="ghost"
                className="h-full w-max p-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  selectProps.menuIsOpen
                    ? selectProps.onMenuClose()
                    : selectProps.onMenuOpen();
                }}
              >
                <ChevronDownIcon
                  size={16}
                  className={cn("transition-transform", isOpen && "rotate-180")}
                />
              </Button>
            );
          },
        }}
        styles={{
          valueContainer(base) {
            return {
              ...base,
              overflow: "auto",
            };
          },
        }}
      />
    );
  },
);

CreatableMultiSelect.displayName = "CreatableMultiSelect";

export default CreatableMultiSelect;
