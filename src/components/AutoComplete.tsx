import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  useMemo,
  useEffect,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

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
  const targetAreaRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef(new Map());

  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value || "");

  useEffect(() => {
    if (!isOpen) return;

    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;

    scrollToOption(selectedOption.value);
  }, [isOpen, value, options]);

  useClickAway(targetAreaRef, () => {
    setOpen(false);
  });

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

  const scrollToOption = (value: string) => {
    const ref = optionRefs.current.get(value);
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <div ref={targetAreaRef}>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute w-max border-primary max-h-64 overflow-y-auto z-50 border bg-popover p-2 text-popover-foreground shadow-md outline-none -ml-[1px] min-w-[200px]"
            onKeyDown={handleKeyDown}
          >
            <div className="grid ">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Button
                    key={option.value}
                    ref={(el) => {
                      if (el) {
                        optionRefs.current.set(option.value, el);
                      }
                    }}
                    type="button"
                    variant="ghost"
                    className="cursor-pointer hover:bg-muted justify-start font-normal"
                    onClick={() => handleSelectOption(option)}
                  >
                    <span>{option.label}</span>
                  </Button>
                ))
              ) : (
                <div className="text-sm text-muted-foreground p-2 w-full text-center">
                  {emptyMessage}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoComplete;
