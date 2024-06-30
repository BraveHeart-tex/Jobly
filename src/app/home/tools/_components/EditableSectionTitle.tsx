"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn } from "@/lib/utils";
import type { Section } from "@/server/db/schema";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EditableSectionTitleProps = {
  containerClassName?: string;
  labelClassName?: string;
  section: Section | undefined;
};

const EditableSectionTitle = ({
  containerClassName,
  labelClassName,
  section,
}: EditableSectionTitleProps) => {
  const PLACEHOLDER_OFFSET_PX = 26;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);
  const [showRenameButton, setShowRenameButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const value = section?.name;

  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (spanRef.current && containerRef.current) {
      const spanWidth = spanRef.current.offsetWidth + PLACEHOLDER_OFFSET_PX;
      containerRef.current.style.width = `${spanWidth}px`;
    }
  }, [spanRef.current, containerRef.current, value]);

  const handleBlur = () => {
    if (!section) return;

    setFocused(false);
    setIsEditing(false);
    if (!value) {
      setSectionValue({
        sectionId: section.id,
        key: "name",
        value: "Untitled",
      });
    }
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

  if (!section) return null;

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
        {value || "Untitled"}
      </span>
      {isEditing ? (
        <div className="w-full">
          <Input
            className="bg-transparent border-0 text-[22px] font-semibold focus:outline-none focus-visible:ring-0 shadow-none  rounded-none text-left overflow-visible min-w-full p-0"
            ref={inputRef}
            placeholder={value}
            onFocus={() => setFocused(true)}
            onBlur={() => handleBlur()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBlur();
              }
            }}
            onChange={(e) => {
              setSectionValue({
                sectionId: section.id,
                key: "name",
                value: e.target.value,
              });
            }}
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
                  <TooltipTrigger asChild>
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
