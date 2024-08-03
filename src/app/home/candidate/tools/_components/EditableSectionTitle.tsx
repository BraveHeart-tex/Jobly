"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DELETABLE_INTERNAL_SECTION_TAGS,
  type INTERNAL_SECTION_TAG,
} from "@/lib/constants";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDeleteSection } from "../_hooks/useDeleteSection";
import type { DocumentSection } from "@/server/db/schema/documentSections";

type EditableSectionTitleProps = {
  containerClassName?: string;
  labelClassName?: string;
  section: DocumentSection | undefined;
};

const PLACEHOLDER_OFFSET_PX = 26;

const EditableSectionTitle = ({
  containerClassName,
  labelClassName,
  section,
}: EditableSectionTitleProps) => {
  const showConfirm = useConfirmStore((state) => state.showConfirmDialog);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const value = section?.name;
  const { deleteSection } = useDeleteSection();

  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );

  const isSectionDeletable = DELETABLE_INTERNAL_SECTION_TAGS.includes(
    // @ts-ignore
    section?.internalSectionTag as INTERNAL_SECTION_TAG,
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

  const handleDeleteSection = () => {
    if (!section) return;
    showConfirm({
      title: "Delete Section",
      message: "Are you sure you want to delete this section?",
      primaryActionLabel: "Delete",
      onConfirm: () => {
        deleteSection({ sectionId: section.id });
      },
    });
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

  const handleResetSectionNameClick = () => {
    if (!section) return;

    setSectionValue({
      sectionId: section.id,
      key: "name",
      value: section.defaultName,
    });
  };

  if (!section) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 h-10 w-full group",
        containerClassName,
      )}
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
            defaultValue={value}
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
        <>
          <div className="lg:opacity-0 lg:-translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
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
            {section.name !== section.defaultName ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="px-1 py-0"
                      onClick={() => handleResetSectionNameClick()}
                    >
                      <RotateCcw size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset section name to default</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        </>
      )}
      {!isEditing && isSectionDeletable ? (
        <>
          <div className="lg:opacity-0 lg:-translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-1 py-0"
                    onClick={() => handleDeleteSection()}
                  >
                    <Trash size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Section</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default EditableSectionTitle;
