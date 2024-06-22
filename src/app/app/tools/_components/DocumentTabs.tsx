"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useDocuments } from "../_hooks/useDocuments";
import DocumentListItem from "./DocumentListItem";
import type { Document } from "@/server/db/schema";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

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
  const router = useRouter();
  const { resumes, coverLetters } = useDocuments();
  const [activeTab, setActiveTab] = useState<DocumentTabValue>(
    DOCUMENT_TAB_VALUES.RESUMES,
  );

  const documentMap = {
    [DOCUMENT_TAB_VALUES.RESUMES]: resumes,
    [DOCUMENT_TAB_VALUES.COVER_LETTERS]: coverLetters,
  };

  const handleCreateNewDocument = () => {
    if (activeTab === DOCUMENT_TAB_VALUES.RESUMES) {
      router.push(`${ROUTES.CV_BUILDER}/create`);
      return;
    }

    if (activeTab === DOCUMENT_TAB_VALUES.COVER_LETTERS) {
      router.push(`${ROUTES.COVER_LETTERS}/create`);
      return;
    }
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
          Your Documents
        </h1>
        <Button onClick={handleCreateNewDocument}>Create New</Button>
      </div>
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
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-[2px] left-0 right-0 h-1 bg-primary w-full rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-1 max-h-[calc(100vh-210px)] overflow-auto">
        <DocumentList documents={documentMap[activeTab]} />
      </div>
    </div>
  );
};

type DocumentListProps = {
  documents: Document[];
};

const DocumentList = ({ documents }: DocumentListProps) => (
  <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
    {documents.map((document) => (
      <DocumentListItem key={document.id} item={document} />
    ))}
  </div>
);

export default DocumentTabs;
