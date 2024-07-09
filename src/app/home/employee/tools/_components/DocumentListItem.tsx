"use client";
import { Button } from "@/components/ui/button";
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
import { EMPLOYEE_ROUTES } from "@/lib/routes";
import type { Document } from "@/server/db/schema";
import { format } from "date-fns";
import { Ellipsis, FileDown, FilePen, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDeleteDocument } from "../_hooks/useDeleteDocument";
import { useUpdateDocument } from "../_hooks/useUpdateDocument";
import { cn } from "@/lib/utils";

type DocumentListItemProps = {
  item: Document;
};

const DocumentListItem = ({ item }: DocumentListItemProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const { handleDeleteDocument, isDeletingDocument } = useDeleteDocument();
  const { updateDocument } = useUpdateDocument();
  const router = useRouter();
  const updatedAtDate = new Date(item.updatedAt as string);

  const goToEditPage = () => {
    const basePath = `${EMPLOYEE_ROUTES.DOCUMENT_BUILDER}/${item.type === "resume" ? "cv-builder" : "cover-letters"}/edit`;
    router.push(`${basePath}/${item.id}`);
  };

  const documentActions = [
    {
      label: "Download PDF",
      icon: <FileDown size={18} />,
      onClick: () => {},
    },
    {
      label: "Edit Document",
      icon: <FilePen size={18} />,
      onClick: () => goToEditPage(),
    },
    {
      label: "Delete Document",
      icon: <Trash2 size={18} />,
      onClick: () => {
        handleDeleteDocument(item.id);
      },
      disabled: isDeletingDocument,
    },
  ];

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
      <div className="grid grid-cols-12 gap-2">
        <div
          className={cn(
            "flex items-center gap-1 w-full col-span-11",
            isRenaming && "col-span-12",
          )}
        >
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
              onClick={() => {
                goToEditPage();
              }}
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
              className={cn("col-span-1", isRenaming ? "hidden" : "flex")}
            >
              <Ellipsis size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-2">
              {documentActions.map((action) => (
                <Button
                  key={action.label}
                  disabled={action.disabled}
                  variant="ghost"
                  className="flex items-center justify-start w-full gap-2"
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-sm text-muted-foreground">
        {format(updatedAtDate, "'Updated' dd MMMM, HH:mm")}
      </p>
    </article>
  );
};

export default DocumentListItem;
