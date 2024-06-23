"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EditableSectionTitleProps = {
  defaultValue: string;
  containerClassName?: string;
  labelClassName?: string;
  onEditEnd?: (value: string) => void;
};

const EditableSectionTitle = ({
  defaultValue,
  containerClassName,
  labelClassName,
}: EditableSectionTitleProps) => {
  const PLACEHOLDER_OFFSET_PX = 26;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [showRenameButton, setShowRenameButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (spanRef.current && containerRef.current) {
      const spanWidth = spanRef.current.offsetWidth + PLACEHOLDER_OFFSET_PX;
      containerRef.current.style.width = `${spanWidth}px`;
    }
  }, [value]);

  const handleBlur = () => {
    setFocused(false);
    setIsEditing(false);
  };

  const getSpanWidthWithOffset = () => {
    if (!spanRef.current) return 0;

    return spanRef.current.offsetWidth;
  };

  const handleRenameClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      const renameInputElement = inputRef.current;
      renameInputElement?.focus();
      renameInputElement?.setSelectionRange(
        0,
        renameInputElement?.value?.length,
      );
    });
  };

  return (
    <div
      className={cn("flex items-center gap-2 h-10 w-full", containerClassName)}
      onMouseEnter={() => setShowRenameButton(true)}
      onMouseLeave={() => setShowRenameButton(false)}
    >
      <span
        ref={spanRef}
        className="absolute whitespace-pre text-[22px] font-semibold"
        style={{
          visibility: "hidden",
        }}
      >
        {value}
      </span>
      {isEditing ? (
        <div className="w-full">
          <Input
            className="bg-transparent border-0 text-[22px] font-semibold focus:outline-none focus-visible:ring-0 shadow-none  rounded-none text-left overflow-visible min-w-full p-0"
            ref={inputRef}
            placeholder={value}
            defaultValue={value}
            onFocus={() => setFocused(true)}
            onBlur={() => handleBlur()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBlur();
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: getSpanWidthWithOffset() || "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-primary w-full h-[2px]"
              />
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className={cn(
            "scroll-m-20 text-[22px] font-semibold",
            labelClassName,
          )}
        >
          {value}
        </div>
      )}

      {!isEditing && (
        <AnimatePresence>
          {showRenameButton && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      className="px-1 py-0"
                      onClick={() => handleRenameClick()}
                    >
                      <Pencil size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rename</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default EditableSectionTitle;
