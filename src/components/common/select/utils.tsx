import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, Loader2Icon, XIcon } from "lucide-react";

import {
  type ClassNamesConfig,
  type GroupBase,
  type SelectComponentsConfig,
  type StylesConfig,
  components,
} from "react-select";
import { Badge } from "@/components/ui/badge";
import type React from "react";
import type { OptionType } from "./types";
import { useEffect, useState } from "react";

export const selectContainerClassNames = "w-full relative z-[9999]";

export const getSelectClassNames = (isMulti = true) => {
  const selectClassNames: ClassNamesConfig<
    OptionType,
    typeof isMulti,
    GroupBase<OptionType>
  > = {
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
  };

  return selectClassNames;
};

export const getSelectComponents = (
  value: OptionType | OptionType[] | null,
  isMulti = true,
) => {
  const selectComponents: Partial<
    SelectComponentsConfig<OptionType, typeof isMulti, GroupBase<OptionType>>
  > = {
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
    Option: (props) => {
      const isSelected = isMulti
        ? (value as OptionType[])?.find((item) => item.label === props.label)
        : (value as OptionType)?.label === props.label;

      return (
        <components.Option
          {...props}
          className={cn(
            props.className,
            isSelected && "pointer-events-none opacity-50 w-full",
          )}
        >
          <div className="flex items-center justify-between w-full">
            {props.label}
            {isSelected ? (
              <span className="ml-auto">
                <CheckIcon size={20} />
              </span>
            ) : null}
          </div>
        </components.Option>
      );
    },
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
                e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>,
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
  };

  return selectComponents;
};

export const getSelectStyles = (isMulti = true) => {
  const selectStyles: Partial<
    StylesConfig<OptionType, typeof isMulti, GroupBase<OptionType>>
  > = {
    valueContainer: (base) => ({
      ...base,
      overflow: "auto",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      pointerEvents: "auto",
    }),
  };

  return selectStyles;
};

export const useMenuPortalTarget = () => {
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  return menuPortalTarget;
};
