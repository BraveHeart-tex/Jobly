import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  useMemo,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface AutoCompleteProps {
  options: Option[];
  emptyMessage?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ENTER_KEY = "Enter";
const ESCAPE_KEY = "Escape";

const AutoComplete = ({
  options,
  placeholder,
  emptyMessage = "No results found",
  value,
  onValueChange,
  disabled,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value || "");

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [options, inputValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === ENTER_KEY && input.value !== "") {
        handleEnterKey(input.value);
      }

      if (event.key === ESCAPE_KEY) {
        handleEscapeKey(input.value);
      }
    },
    [isOpen],
  );

  const handleEnterKey = (inputValue: string) => {
    if (!inputValue) return;

    const selectedOption = findOptionByLabel(inputValue);
    if (selectedOption) {
      onValueChange?.(selectedOption.value);
    } else {
      onValueChange?.(inputValue);
    }

    setOpen(false);
  };

  const handleEscapeKey = (inputValue: string) => {
    inputRef.current?.blur();
    setOpen(false);
    onValueChange?.(inputValue);
  };

  const findOptionByLabel = (label: string) => {
    return options.find((option) => option.label === label);
  };

  const handleSelectOption = (selectedOption: Option) => {
    setInputValue(selectedOption.label);
    onValueChange?.(selectedOption?.value);
    setOpen(false);
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 50);
  };

  return (
    <div>
      <Input
        ref={inputRef}
        value={inputValue}
        onClick={() => setOpen(true)}
        disabled={disabled}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className={cn(isOpen && "rounded-bl-none")}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {isOpen && (
        <div
          className="absolute w-max border-primary max-h-64 overflow-y-auto z-50 border bg-popover p-2 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 -ml-[1px] min-w-[200px]"
          onKeyDown={handleKeyDown}
          data-state={isOpen ? "open" : "closed"}
          data-side="bottom"
        >
          <div className="grid ">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  className="cursor-pointer hover:bg-muted justify-start font-normal"
                  onClick={() => handleSelectOption(option)}
                >
                  <span>{option.label}</span>

                  {option.value === value && (
                    <CheckIcon className="ml-2 h-4 w-4" />
                  )}
                </Button>
              ))
            ) : (
              <div className="text-sm text-muted-foreground p-2 w-full text-center">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
