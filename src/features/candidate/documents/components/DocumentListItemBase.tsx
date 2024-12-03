"use client";
import ClientOnly from "@/components/common/ClientOnly";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type UpdateDocumentMutateFunctionKey,
  useUpdateDocument,
} from "@/features/candidate/document-builder/hooks/useUpdateDocument";
import { cn } from "@/lib/utils";
import { formatToMediumDateTimeWithWeekday } from "@/lib/utils/date";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { Ellipsis, Pencil } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

interface ListItemAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
}

interface ListItemBaseProps {
  item: DocumentSelectModel;
  actions: ListItemAction[];
  onTitleClick?: () => void;
  functionKey: UpdateDocumentMutateFunctionKey;
}

const DocumentListItemBase = ({
  item,
  actions,
  onTitleClick,
  functionKey,
}: ListItemBaseProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const { updateDocument } = useUpdateDocument(functionKey);

  const handleRenameInputBlur = () => {
    if (!renameInputRef.current) return;

    const enteredTitle = renameInputRef.current.value;
    if (!enteredTitle || enteredTitle === item.title) {
      setIsRenaming(false);
      return;
    }

    updateDocument({
      id: item.id,
      title: enteredTitle,
    });

    setIsRenaming(false);
  };

  return (
    <article className="grid gap-2 rounded-md border p-4 bg-card group">
      <div className="flex items-center justify-between gap-2">
        <div className={cn("flex items-center gap-1 w-full flex-1")}>
          {isRenaming ? (
            <Input
              ref={renameInputRef}
              autoFocus
              onBlur={() => handleRenameInputBlur()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameInputBlur();
                }
              }}
              defaultValue={item.title}
              placeholder={item.title}
              className="border-0 border-b"
            />
          ) : (
            <Button
              variant="link"
              className="text-foreground hover:text-primary hover:no-underline transition-all px-0 text-base truncate max-w-full"
              onClick={onTitleClick}
            >
              {item.title}
            </Button>
          )}
          {!isRenaming && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-1 py-0 lg:opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 lg:-translate-y-1 group-hover:translate-y-0"
                    onClick={() => {
                      setIsRenaming(true);
                    }}
                  >
                    <Pencil size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rename</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("", isRenaming ? "hidden" : "flex")}
            >
              <Ellipsis size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-2">
              {actions.map(({ label, disabled, variant, onClick, icon }) => (
                <Button
                  key={label}
                  disabled={disabled}
                  variant={variant || "ghost"}
                  className="flex items-center justify-start w-full gap-2"
                  onClick={onClick}
                >
                  {icon}
                  {label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <ClientOnly>
        <p className="text-sm text-muted-foreground">
          Last updated: {formatToMediumDateTimeWithWeekday(item.updatedAt)}
        </p>
      </ClientOnly>
    </article>
  );
};

export default DocumentListItemBase;
