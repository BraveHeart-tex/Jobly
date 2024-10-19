"use client";

import { forwardRef } from "react";
import {
  getSelectClassNames,
  getSelectComponents,
  getSelectStyles,
  selectContainerClassNames,
  useMenuPortalTarget,
} from "./utils";
import CreatableReactSelect from "react-select/creatable";
import type { OptionType } from "./types";
import CreatableMultiSelect from "./CreatableMultiSelect";

interface CreatableSelectProps {
  isMulti?: boolean;
  disabled?: boolean;
  onCreateOption?: (value: string) => void;
  value: OptionType[] | OptionType | null;
  placeholder?: string;
  formatCreateLabel?: (label: string) => string | false;
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
          menuPortalTarget={menuPortalTarget}
          components={getSelectComponents(value, isMulti)}
          classNames={getSelectClassNames(isMulti)}
          value={value}
          styles={getSelectStyles(isMulti)}
          placeholder={placeholder}
          unstyled
          formatCreateLabel={formatCreateLabel}
        />
      </div>
    );
  },
);

CreatableMultiSelect.displayName = "CreatableSelect";

export default CreatableSelect;
