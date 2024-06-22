"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useDocuments } from "../_hooks/useDocuments";
import DocumentListItem from "./DocumentListItem";

const DOCUMENT_TAB_VALUES = {
  RESUMES: "resumes",
  COVER_LETTERS: "cover-letters",
} as const;

type DocumentTabValue =
  (typeof DOCUMENT_TAB_VALUES)[keyof typeof DOCUMENT_TAB_VALUES];

const tabItems: {
  label: string;
  value: DocumentTabValue;
}[] = [
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
  const [activeTab, setActiveTab] = useState<DocumentTabValue>(
    DOCUMENT_TAB_VALUES.RESUMES,
  );

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
      <div className="pt-1 max-h-[calc(100vh-210px)] overflow-auto">
        {activeTab === DOCUMENT_TAB_VALUES.RESUMES && (
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
              <DocumentListItem key={resume.id} item={resume} />
            ))}
          </div>
        )}
        {activeTab === DOCUMENT_TAB_VALUES.COVER_LETTERS && (
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {coverLetters.map((coverLetter) => (
              <DocumentListItem key={coverLetter.id} item={coverLetter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentTabs;
