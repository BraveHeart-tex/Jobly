"use client";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CollapsibleSectionItemContainerProps = {
  triggerTitle?: string;
  triggerDescription?: string;
  children: React.ReactNode;
};

const CollapsibleSectionItemContainer = ({
  triggerTitle = "Software Engineer at Mims Yazılım",
  triggerDescription = "Jul 2023 - Present",
  children,
}: CollapsibleSectionItemContainerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={cn(
        "rounded-md border flex flex-col transition-all",
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollapsibleSectionItemContainer;
