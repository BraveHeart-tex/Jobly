"use client";

import type React from "react";
import type { MultiValue, SingleValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import { forwardRef } from "react";
import type { OptionType } from "@/components/common/select/types";
import {
  useMenuPortalTarget,
  selectContainerClassNames,
  getSelectClassNames,
  getSelectComponents,
  getSelectStyles,
} from "@/components/common/select/utils";

interface CreatableMultiSelectProps<T extends boolean> {
  value: T extends true
    ? MultiValue<OptionType> | null
    : SingleValue<OptionType> | null;
  placeholder?: string;
  className?: string;
  onCreateOption?: (value: string) => void;
  onChange?: (
    newValue: T extends true
      ? MultiValue<OptionType> | null
      : SingleValue<OptionType> | null,
  ) => void;
  onInputChange?: (inputValue: string) => void;
  isLoading?: boolean;
  loadOptions?: (inputValue: string) => Promise<OptionType[]>;
  controlShouldRenderValue?: boolean;
  isMulti?: T;
  showCreateLabel?: boolean;
  disabled?: boolean;
}

const BaseCreatableMultiSelect = <IsMulti extends boolean = true>(
  {
    value,
    placeholder,
    onCreateOption,
    onChange,
    onInputChange,
    isLoading,
    loadOptions,
    controlShouldRenderValue = true,
    isMulti = true as IsMulti,
    showCreateLabel = true,
    disabled = false,
  }: CreatableMultiSelectProps<IsMulti>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const menuPortalTarget = useMenuPortalTarget();

  const handleInputChange = (inputValue: string) => {
    onInputChange?.(inputValue);
  };

  const handleValueChange = (
    newValue: CreatableMultiSelectProps<IsMulti>["value"],
  ) => {
    onChange?.(newValue);
  };

  return (
    <div ref={ref} className={selectContainerClassNames}>
      <AsyncCreatableSelect<OptionType, typeof isMulti>
        isClearable
        isMulti={isMulti}
        onInputChange={handleInputChange}
        allowCreateWhileLoading={false}
        onChange={handleValueChange}
        isDisabled={disabled}
        defaultOptions
        cacheOptions
        controlShouldRenderValue={controlShouldRenderValue}
        loadOptions={loadOptions}
        isLoading={isLoading}
        onCreateOption={onCreateOption}
        backspaceRemovesValue={controlShouldRenderValue}
        value={value}
        placeholder={placeholder}
        classNames={getSelectClassNames(isMulti)}
        unstyled
        // @ts-ignore
        components={getSelectComponents(
          value as OptionType | OptionType[],
          isMulti,
        )}
        styles={getSelectStyles(isMulti)}
        menuPortalTarget={menuPortalTarget}
        menuPosition="fixed"
        maxMenuHeight={200}
        formatCreateLabel={(value: string) =>
          showCreateLabel ? `Create "${value}"` : false
        }
      />
    </div>
  );
};

const CreatableMultiSelect = forwardRef(BaseCreatableMultiSelect) as <
  IsMulti extends boolean = true,
>(
  props: CreatableMultiSelectProps<IsMulti> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

BaseCreatableMultiSelect.displayName = "CreatableMultiSelect";

export default CreatableMultiSelect;
