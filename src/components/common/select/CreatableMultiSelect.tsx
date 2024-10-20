"use client";

import { forwardRef } from "react";
import type { MultiValue, SingleValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
  getSelectClassNames,
  getSelectComponents,
  getSelectStyles,
  selectContainerClassNames,
  useMenuPortalTarget,
} from "./utils";
import type { OptionType } from "./types";

interface CreatableMultiSelectProps {
  value: OptionType[] | OptionType | null;
  placeholder?: string;
  className?: string;
  onCreateOption?: (value: string) => void;
  onChange?: (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
  ) => void;
  onInputChange?: (inputValue: string) => void;
  isLoading?: boolean;
  loadOptions?: (inputValue: string) => Promise<OptionType[]>;
  controlShouldRenderValue?: boolean;
  isMulti?: boolean;
  showCreateLabel?: boolean;
  disabled?: boolean;
}

const CreatableMultiSelect = forwardRef<
  HTMLDivElement,
  CreatableMultiSelectProps
>(
  (
    {
      value,
      placeholder,
      onCreateOption,
      onChange,
      onInputChange,
      isLoading,
      loadOptions,
      controlShouldRenderValue = true,
      isMulti = true,
      showCreateLabel = true,
      disabled = false,
    }: CreatableMultiSelectProps,
    ref,
  ) => {
    const menuPortalTarget = useMenuPortalTarget();

    const handleInputChange = (inputValue: string) => {
      onInputChange?.(inputValue);
    };

    const handleValueChange = (
      newValue: SingleValue<OptionType> | MultiValue<OptionType>,
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
          components={getSelectComponents(value, isMulti)}
          styles={getSelectStyles(isMulti)}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          maxMenuHeight={200}
          formatCreateLabel={(value) =>
            showCreateLabel ? `Create "${value}"` : false
          }
        />
      </div>
    );
  },
);

CreatableMultiSelect.displayName = "CreatableMultiSelect";

export default CreatableMultiSelect;
