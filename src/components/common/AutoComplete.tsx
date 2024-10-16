import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  type KeyboardEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";

interface Option {
  label: string;
  value: string;
}

interface AutoCompleteProps {
  options: Option[];
  emptyMessage?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const ENTER_KEY = "Enter" as const;
const ESCAPE_KEY = "Escape" as const;
const ARROW_UP_KEY = "ArrowUp" as const;
const ARROW_DOWN_KEY = "ArrowDown" as const;

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      options,
      placeholder,
      emptyMessage = "No results found",
      value,
      onChange,
      disabled,
    },
    ref,
  ) => {
    const targetAreaRef = useRef(null);
    const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>(value || "");
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      if (!isOpen) return;

      const selectedOption = filteredOptions[selectedIndex];
      if (selectedOption) {
        scrollToOption(selectedOption.value);
      }
    }, [isOpen, selectedIndex]);

    useEffect(() => {
      if (!isOpen) {
        setSelectedIndex(-1);
      }
    }, [isOpen]);

    // biome-ignore lint/style/noNonNullAssertion:
    useImperativeHandle(ref, () => inputRef.current!);

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

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) {
        setOpen(true);
      }

      const commands = {
        [ARROW_UP_KEY]: () => handleArrowUpKey(),
        [ARROW_DOWN_KEY]: () => handleArrowDownKey(),
        [ENTER_KEY]: () => handleEnterKey(input.value),
        [ESCAPE_KEY]: () => handleEscapeKey(input.value),
      };

      const command = commands[event.key as keyof typeof commands];
      if (command) {
        event.preventDefault();
        command();
      }
    };

    const handleArrowUpKey = () => {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    };

    const handleArrowDownKey = () => {
      if (selectedIndex < filteredOptions.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    };

    const handleEnterKey = (inputValue: string) => {
      const selectedOption = findOptionByLabel(inputValue);
      const selectedOptionByIndex = filteredOptions[selectedIndex];

      if (selectedOption) {
        onChange?.(selectedOption.value);
      } else if (selectedOptionByIndex) {
        onChange?.(selectedOptionByIndex.value);
        setInputValue(selectedOptionByIndex.label);
      }

      setOpen(false);
    };

    const handleEscapeKey = (inputValue: string) => {
      inputRef.current?.blur();
      setOpen(false);
      onChange?.(inputValue);
    };

    const findOptionByLabel = (label: string) => {
      return options.find((option) => option.label === label);
    };

    const handleSelectOption = (selectedOption: Option) => {
      setInputValue(selectedOption.label);
      onChange?.(selectedOption?.value);
      setOpen(false);
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 50);
    };

    const scrollToOption = (value: string) => {
      const ref = optionRefs.current.get(value);
      if (ref) {
        ref.scrollIntoView({
          behavior: "instant",
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
          onChange={(e) => {
            if (selectedIndex !== 0) setSelectedIndex(0);
            onChange?.(e.target.value);
            setInputValue(e.target.value);
          }}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute w-max border-primary max-h-64 overflow-y-auto z-50 border bg-popover p-2 text-popover-foreground shadow-md outline-none -ml-[1px] min-w-[200px]"
              onKeyDown={handleKeyDown}
            >
              <div className="grid">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <Button
                      key={option.value}
                      ref={(el) => {
                        if (el) {
                          optionRefs.current.set(option.value, el);
                        }
                      }}
                      type="button"
                      variant="ghost"
                      className={cn(
                        "cursor-pointer hover:bg-muted justify-start font-normal transition-none",
                        selectedIndex === index && "bg-muted",
                      )}
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
  },
);

export default AutoComplete;
