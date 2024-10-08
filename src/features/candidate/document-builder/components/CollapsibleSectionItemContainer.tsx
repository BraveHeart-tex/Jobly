"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FIELD_DND_INDEX_PREFIX } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PopoverClose } from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  EllipsisIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { GripVertical } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useMedia } from "react-use";

interface CollapsibleSectionItemContainerProps {
  id: `${FIELD_DND_INDEX_PREFIX}-${number}`;
  triggerTitle?: string;
  triggerDescription?: string;
  children: React.ReactNode;
  onDeleteItemClick?: () => void;
}

const CollapsibleSectionItemContainer = ({
  triggerTitle,
  triggerDescription,
  children,
  onDeleteItemClick,
  id,
}: CollapsibleSectionItemContainerProps) => {
  const [open, setOpen] = useState(false);
  const isMobileOrTablet = useMedia("(max-width: 1024px)", false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    isSorting,
  } = useSortable({ id });

  const shouldShowDeleteButton =
    onDeleteItemClick && !isDragging && !isOver && !isSorting;
  const shouldShowDragButton = !isDragging && !isOver && !isSorting;

  return (
    <div
      className="w-full relative group"
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
    >
      {shouldShowDragButton ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                {...listeners}
                className="cursor-grab lg:pointer-events-none lg:group-hover:pointer-events-auto lg:opacity-0 lg:group-hover:opacity-100 absolute -left-7 lg:-left-8 top-[19px] z-10 w-8 h-8 text-muted-foreground transition-all"
              >
                <GripVertical />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click and drag to move</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
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
              onClick={() => {
                if (isDragging || isSorting || isOver) return;
                setOpen(!open);
              }}
            >
              <div
                className={cn(
                  "flex flex-col min-h-9",
                  !triggerDescription && "justify-center",
                )}
              >
                <span className="max-w-full truncate">{triggerTitle}</span>
                <span
                  className={cn(
                    "text-xs text-muted-foreground opacity-100 transition-all ease-in",
                    !triggerDescription && "opacity-0",
                  )}
                >
                  {triggerDescription}
                </span>
              </div>
            </Button>
            {isMobileOrTablet ? (
              <Popover>
                <PopoverTrigger>
                  <EllipsisIcon className="mr-2 group text-muted-foreground transition-all" />
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      className="border-b rounded-none py-6 flex items-center gap-2 w-full justify-start"
                      onClick={() => setOpen(true)}
                    >
                      <PencilIcon className="text-primary" size={18} />
                      <span className="text-sm">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="py-6 flex items-center gap-2 w-full justify-start"
                      onClick={onDeleteItemClick}
                    >
                      <TrashIcon className="text-primary" size={18} />
                      <span className="text-sm">Delete</span>
                    </Button>
                  </div>
                  <PopoverClose asChild>
                    <Button className="rounded-none w-full">Cancel</Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            ) : (
              <ChevronDownIcon
                onClick={() => setOpen(!open)}
                className={cn(
                  "mr-2 group-hover:text-primary text-muted-foreground transition-all cursor-pointer",
                  open ? "rotate-180" : "rotate-0",
                )}
              />
            )}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && !isMobileOrTablet && (
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
      {shouldShowDeleteButton ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={
                  "hidden absolute -right-9 top-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all text-muted-foreground ease-out lg:flex"
                }
                onClick={onDeleteItemClick}
                size="icon"
                variant="ghost"
              >
                <TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
      {isMobileOrTablet ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent showClose={undefined} className="min-w-full">
            <SheetHeader className="space-y-1 items-center">
              <SheetTitle>
                <Button
                  className="absolute top-1 left-1 size-8"
                  onClick={() => setOpen(false)}
                  size="icon"
                  variant="secondary"
                >
                  <ArrowLeftIcon />
                </Button>
                {triggerTitle}
              </SheetTitle>
              <SheetDescription>
                {triggerDescription || "(Not Specified)"}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">{children}</div>

            <SheetFooter className="mt-4">
              <Button onClick={() => setOpen(false)}>Done</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : null}
    </div>
  );
};

export default CollapsibleSectionItemContainer;
