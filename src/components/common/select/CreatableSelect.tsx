"use client";

import { forwardRef } from "react";
import CreatableReactSelect from "react-select/creatable";
import type { MultiValue, SingleValue } from "react-select";
import type { OptionType } from "@/components/common/select/types";
import {
  getSelectClassNames,
  getSelectComponents,
  getSelectStyles,
  selectContainerClassNames,
  useMenuPortalTarget,
} from "@/components/common/select/utils";

interface CreatableSelectProps {
  isMulti?: boolean;
  disabled?: boolean;
  onCreateOption?: (value: string) => void;
  value: OptionType[] | OptionType | null;
  placeholder?: string;
  formatCreateLabel?: (label: string) => string | false;
  options: OptionType[];
  onChange?: (
    newValue: CreatableSelectProps["isMulti"] extends true
      ? MultiValue<OptionType>
      : SingleValue<OptionType>,
  ) => void;
}

const CreatableSelect = forwardRef<HTMLDivElement, CreatableSelectProps>(
  (
    {
      isMulti = false,
      disabled,
      onCreateOption,
      value,
      placeholder,
      formatCreateLabel,
      options,
      onChange,
    },
    ref,
  ) => {
    const menuPortalTarget = useMenuPortalTarget();

    return (
      <div ref={ref} className={selectContainerClassNames}>
        <CreatableReactSelect
          isClearable
          isMulti={isMulti}
          allowCreateWhileLoading={false}
          isDisabled={disabled}
          onCreateOption={onCreateOption}
          menuPosition="fixed"
          maxMenuHeight={200}
          // @ts-ignore
          onChange={onChange}
          menuPortalTarget={menuPortalTarget}
          components={getSelectComponents(value, isMulti)}
          classNames={getSelectClassNames(isMulti)}
          value={value}
          styles={getSelectStyles(isMulti)}
          placeholder={placeholder}
          unstyled
          formatCreateLabel={formatCreateLabel}
          options={options}
        />
      </div>
    );
  },
);

CreatableSelect.displayName = "CreatableSelect";

export default CreatableSelect;
