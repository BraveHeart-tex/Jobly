"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import type { CoverLetter, Resume } from "@/server/db/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, FileDown, FilePen, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteDocument } from "../_hooks/useDeleteDocument";

type DocumentListItemProps = {
  item: Resume | CoverLetter;
};

const DocumentListItem = ({ item }: DocumentListItemProps) => {
  const [showRenameButton, setShowRenameButton] = useState(false);
  const { deleteDocument } = useDeleteDocument();
  const router = useRouter();
  const updatedAtDate = new Date(item.updatedAt as string);

  const documentActions = [
    {
      label: "Download PDF",
      icon: <FileDown size={18} />,
      onClick: () => {},
    },
    {
      label: "Edit Document",
      icon: <FilePen size={18} />,
      onClick: () => {
        router.push(`/app/tools/cv-builder/edit/${item.id}`);
      },
    },
    {
      label: "Delete Document",
      icon: <Trash2 size={18} />,
      onClick: () => {
        deleteDocument(item.id);
      },
    },
  ];

  return (
    <article className="grid gap-2 rounded-md border p-4 bg-card">
      <div className="flex items-center justify-between w-full">
        <div
          className="flex items-center gap-1 w-full"
          onMouseEnter={() => setShowRenameButton(true)}
          onMouseLeave={() => setShowRenameButton(false)}
        >
          <h3 className="text-foreground">{item.title}</h3>
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
                      <Button variant="ghost" className="px-1 py-0">
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
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-2">
              {documentActions.map((action) => (
                <Button
                  key={action.label}
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
