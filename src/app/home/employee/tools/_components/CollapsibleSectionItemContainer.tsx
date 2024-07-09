"use client";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CollapsibleSectionItemContainerProps = {
  triggerTitle?: string;
  triggerDescription?: string;
  children: React.ReactNode;
  onDeleteItemClick?: () => void;
};

const CollapsibleSectionItemContainer = ({
  triggerTitle,
  triggerDescription,
  children,
  onDeleteItemClick,
}: CollapsibleSectionItemContainerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full relative group">
      <motion.div
        className={cn(
          "rounded-md border flex flex-col transition-all w-full",
          open && "max-h-max",
        )}
      >
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-between group">
            <Button
              variant="ghost"
              className="w-full h-full text-left flex items-center justify-start py-4 hover:bg-transparent bg-transparent hover:text-primary"
              onClick={() => setOpen(!open)}
            >
              <div className="grid">
                {triggerTitle}
                <span className="text-xs text-muted-foreground">
                  {triggerDescription}
                </span>
              </div>
            </Button>
            <ChevronDownIcon
              onClick={() => setOpen(!open)}
              className={cn(
                "mr-2 group-hover:text-primary text-muted-foreground transition-all cursor-pointer",
                open ? "rotate-180" : "rotate-0",
              )}
            />
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  opacity: { duration: 0.15, delay: 0.15 },
                  width: { duration: 0.15 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  opacity: { duration: 0.15 },
                  width: { duration: 0.15, delay: 0.15 },
                },
              }}
            >
              <div className="p-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {onDeleteItemClick ? (
        <Button
          className={cn(
            "absolute -right-9 top-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all text-muted-foreground ease-out",
            triggerDescription && "top-4",
          )}
          onClick={onDeleteItemClick}
          size="icon"
          variant="ghost"
        >
          <TrashIcon />
        </Button>
      ) : null}
    </div>
  );
};

export default CollapsibleSectionItemContainer;
