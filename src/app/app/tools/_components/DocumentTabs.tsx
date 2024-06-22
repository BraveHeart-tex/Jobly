"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { useDocuments } from "../_hooks/useDocuments";
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

const DOCUMENT_TAB_VALUES = {
  RESUMES: "resumes",
  COVER_LETTERS: "cover-letters",
};

const tabItems = [
  {
    label: "Resumes",
    value: DOCUMENT_TAB_VALUES.RESUMES,
  },
  {
    label: "Cover Letters",
    value: DOCUMENT_TAB_VALUES.COVER_LETTERS,
  },
];

const DocumentTabs = () => {
  const { resumes, coverLetters } = useDocuments();
  const [activeTab, setActiveTab] = useState(DOCUMENT_TAB_VALUES.RESUMES);

  return (
    <div className="grid gap-2">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
        Your Documents
      </h1>
      <div className="w-full border-b relative">
        <div className="flex items-center gap-4 w-max">
          {tabItems.map((item) => (
            <div key={item.label} className="relative w-max">
              <Button
                variant="link"
                className={cn(
                  "text-foreground p-0 hover:no-underline hover:text-primary font-normal text-[18px]",
                )}
                onClick={() => {
                  setActiveTab(item.value);
                }}
              >
                {item.label}
              </Button>
              {activeTab === item.value && (
                <motion.div
                  layoutId="active-tab-transition"
                  className="absolute -bottom-[2px] left-0 right-0 h-1 bg-primary w-full rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        {activeTab === DOCUMENT_TAB_VALUES.RESUMES && (
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
              <DocumentItem key={resume.id} item={resume} />
            ))}
          </div>
        )}
        {activeTab === DOCUMENT_TAB_VALUES.COVER_LETTERS && (
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {coverLetters.map((coverLetter) => (
              <DocumentItem key={coverLetter.id} item={coverLetter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type DocumentItemProps = {
  item: Resume | CoverLetter;
};

const DocumentItem = ({ item }: DocumentItemProps) => {
  const [showRenameButton, setShowRenameButton] = useState(false);
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
      onClick: () => {},
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
                  <Tooltip delayDuration={400}>
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

export default DocumentTabs;
