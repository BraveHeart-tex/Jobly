"use client";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateDocumentAndRelatedEntities } from "@/features/candidate/document-builder/hooks/useCreateDocumentAndRelatedEntities";
import { CANDIDATE_ROUTES } from "@/lib/routes";
import type { InferValueTypeFromConst } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useId, useState } from "react";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/toastUtils";
import DocumentListItem from "@/features/candidate/documents/components/DocumentListItem";
import { useDocuments } from "@/features/candidate/documents/hooks/useDocuments";
import EmptyListCallToAction from "@/components/common/EmptyListCallToAction";

const DOCUMENT_TAB_VALUES = {
  RESUME: "resume",
  COVER_LETTER: "cover_letter",
} as const;

const DOCUMENT_ROUTE_MAP = {
  [DOCUMENT_TAB_VALUES.RESUME]: `${CANDIDATE_ROUTES.DOCUMENT_BUILDER}/cv-builder/edit`,
  [DOCUMENT_TAB_VALUES.COVER_LETTER]: `${CANDIDATE_ROUTES.DOCUMENT_BUILDER}/cover-letters/edit`,
};

type DocumentTabValue = InferValueTypeFromConst<typeof DOCUMENT_TAB_VALUES>;

const tabItems: {
  label: string;
  value: DocumentTabValue;
}[] = [
  {
    label: "Resumes",
    value: DOCUMENT_TAB_VALUES.RESUME,
  },
  {
    label: "Cover Letters",
    value: DOCUMENT_TAB_VALUES.COVER_LETTER,
  },
];

const DocumentTabs = () => {
  const router = useRouter();
  const {
    resumes,
    coverLetters,
    isPending: isPendingDocuments,
  } = useDocuments();
  const { createDocumentAndRelatedEntities, isCreatingDocument } =
    useCreateDocumentAndRelatedEntities();
  const layoutId = useId();
  const [activeTab, setActiveTab] = useState<DocumentTabValue>(
    DOCUMENT_TAB_VALUES.RESUME,
  );

  const documentMap = {
    [DOCUMENT_TAB_VALUES.COVER_LETTER]: coverLetters,
    [DOCUMENT_TAB_VALUES.RESUME]: resumes,
  };

  const handleCreateNewDocument = async () => {
    const loadingToastId = showLoadingToast("Creating document...");
    const documentInsertId = await createDocumentAndRelatedEntities(activeTab);

    if (!documentInsertId) {
      showErrorToast(
        "We encountered a problem while creating the document. Please try again later.",
        {
          id: loadingToastId,
        },
      );
      return;
    }

    showSuccessToast(
      "Document created successfully. You are being redirected.",
      {
        id: loadingToastId,
      },
    );

    const route = DOCUMENT_ROUTE_MAP[activeTab];
    router.push(`${route}/${documentInsertId}`);
  };

  const shouldRenderNotFound =
    documentMap[activeTab].length === 0 && !isPendingDocuments;
  const shouldRenderSkeletons =
    documentMap[activeTab].length === 0 && isPendingDocuments;

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <PageTitle>Your Documents</PageTitle>
        <Button
          onClick={handleCreateNewDocument}
          className="flex items-center gap-2"
          disabled={isCreatingDocument}
        >
          <Plus size={18} />
          <span className="hidden md:inline">Create New</span>
        </Button>
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
                  layoutId={layoutId}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-[2px] left-0 right-0 h-1 bg-primary w-full rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-1 max-h-[calc(100vh-210px)] overflow-auto">
        {shouldRenderSkeletons && (
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            <Skeleton className="w-full h-12 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
          </div>
        )}
        {shouldRenderNotFound ? (
          <NoDocumentsFound
            loading={isCreatingDocument ? true : undefined}
            activeTab={activeTab}
            onCreateNewDocumentClick={() => handleCreateNewDocument()}
          />
        ) : (
          <DocumentList documents={documentMap[activeTab]} />
        )}
      </div>
    </div>
  );
};

export default DocumentTabs;

interface NoDocumentsFoundProps {
  activeTab: DocumentTabValue;
  onCreateNewDocumentClick?: () => void;
  loading?: boolean;
}

const NoDocumentsFound = ({
  activeTab,
  onCreateNewDocumentClick,
  loading,
}: NoDocumentsFoundProps) => {
  const notFoundContentMap = {
    [DOCUMENT_TAB_VALUES.COVER_LETTER]: {
      title: "A cover letter to win hearts and minds",
      illustrationPath: "/illustrations/cover-letter.svg",
      description:
        "Stand out from other applicants - create a cover letter that speaks directly to employers.",
    },
    [DOCUMENT_TAB_VALUES.RESUME]: {
      title: "Double your chances of getting hired",
      illustrationPath: "/illustrations/resume.svg",
      description: "Craft a tailored resume for each job application.",
    },
  };

  const createNewButtonLabelMap = {
    [DOCUMENT_TAB_VALUES.COVER_LETTER]: "New Cover Letter",
    [DOCUMENT_TAB_VALUES.RESUME]: "New Resume",
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full mx-auto">
      <EmptyListCallToAction {...notFoundContentMap[activeTab]} />
      <Button
        className="flex items-center gap-1 w-max mt-4"
        onClick={onCreateNewDocumentClick}
        disabled={loading}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            <Plus size={18} />
            <span className="hidden md:inline-block">
              {createNewButtonLabelMap[activeTab]}
            </span>
          </>
        )}
      </Button>
    </div>
  );
};

interface DocumentListProps {
  documents: DocumentSelectModel[];
}

const DocumentList = ({ documents }: DocumentListProps) => (
  <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
    {documents.map((document) => (
      <DocumentListItem key={document.id} item={document} />
    ))}
  </div>
);
