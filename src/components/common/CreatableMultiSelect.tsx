"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Loader2Icon, XIcon } from "lucide-react";
import type { MultiValue } from "react-select";
import type React from "react";
import { forwardRef, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

export interface OptionType {
  value: string | number;
  label: string;
}

interface CreatableSelectProps {
  value: OptionType[];
  placeholder?: string;
  className?: string;
  onCreateOption?: (value: string) => void;
  onChange?: (newValues: MultiValue<OptionType>) => void;
  onInputChange?: (inputValue: string) => void;
  isLoading?: boolean;
  loadOptions?: (inputValue: string) => Promise<OptionType[]>;
}

const CreatableMultiSelect = forwardRef(
  (
    {
      value,
      placeholder,
      onCreateOption,
      onChange,
      onInputChange,
      isLoading,
      loadOptions,
    }: CreatableSelectProps,
    ref,
  ) => {
    const [menuPortalTarget, setMenuPortalTarget] =
      useState<HTMLElement | null>(null);

    const handleInputChange = (inputValue: string) => {
      onInputChange?.(inputValue);
    };

    const handleValueChange = (newValue: MultiValue<OptionType>) => {
      onChange?.(newValue);
    };

    return (
      <div ref={(el) => setMenuPortalTarget(el)}>
        <AsyncCreatableSelect<OptionType, true>
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          ref={ref as any}
          isClearable
          isMulti
          onInputChange={handleInputChange}
          allowCreateWhileLoading={false}
          onChange={handleValueChange}
          defaultOptions
          cacheOptions
          loadOptions={loadOptions}
          isLoading={isLoading}
          onCreateOption={onCreateOption}
          value={value}
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
            LoadingIndicator: () => (
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Loader2Icon size={16} className="animate-spin" />
              </div>
            ),
            LoadingMessage: () => (
              <div className="p-2">
                <p>Loading...</p>
              </div>
            ),
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
                    className={cn(
                      "transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </Button>
              );
            },
          }}
          styles={{
            valueContainer: (base) => ({
              ...base,
              overflow: "auto",
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
        />
      </div>
    );
  },
);

CreatableMultiSelect.displayName = "CreatableMultiSelect";

export default CreatableMultiSelect;
