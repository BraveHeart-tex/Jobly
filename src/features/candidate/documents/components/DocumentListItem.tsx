"use client";
import { showErrorToast, showInfoToast } from "@/components/toastUtils";
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
import LondonTemplate from "@/features/candidate/document-builder/components/LondonTemplate";
import { preparePdfData } from "@/features/candidate/document-builder/components/utils";
import { useDeleteDocument } from "@/features/candidate/document-builder/hooks/useDeleteDocument";
import { useUpdateDocument } from "@/features/candidate/document-builder/hooks/useUpdateDocument";
import { isErrorObject } from "@/lib/guards";
import { CANDIDATE_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { formatToMediumDateTimeWithWeekday } from "@/lib/utils/date";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { api } from "@/trpc/react";
import { pdf } from "@react-pdf/renderer";
import {
  Ellipsis,
  FileDown,
  FilePen,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useRef, useState } from "react";

interface DocumentListItemProps {
  item: DocumentSelectModel;
}

const DocumentListItem = ({ item }: DocumentListItemProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const { handleDeleteDocument, isDeletingDocument } = useDeleteDocument();
  const { updateDocument } = useUpdateDocument();
  const router = useRouter();
  const utils = api.useUtils();

  const goToEditPage = () => {
    const basePath = `${CANDIDATE_ROUTES.DOCUMENT_BUILDER}/${item.type === "resume" ? "cv-builder" : "cover-letters"}/edit`;
    router.push(`${basePath}/${item.id}`);
  };

  const handleDownloadPDF = async () => {
    if (item.type === "cover_letter") {
      return showInfoToast(
        "You can download only resumes as PDF at the moment.",
      );
    }

    setIsDownloading(true);

    const documentDataResponse = await utils.document.getDocumentDetails.fetch({
      id: item.id,
    });

    if (isErrorObject(documentDataResponse)) {
      return showErrorToast(documentDataResponse.error);
    }

    const blob = await pdf(
      <LondonTemplate data={preparePdfData(documentDataResponse)} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.title}.pdf`;
    link.click();

    URL.revokeObjectURL(url);

    setIsDownloading(false);
  };

  const documentActions = [
    {
      label: !isDownloading ? "Download PDF" : "Downloading PDF...",
      icon: !isDownloading ? (
        <FileDown size={18} />
      ) : (
        <Loader2 size={18} className="animate-spin" />
      ),
      onClick: handleDownloadPDF,
      disabled: isDownloading,
    },
    {
      label: "Edit Document",
      icon: <FilePen size={18} />,
      onClick: goToEditPage,
    },
    {
      label: "Delete Document",
      variant: "destructive" as const,
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
              {documentActions.map(
                ({ label, disabled, variant, onClick, icon }) => (
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
                ),
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-sm text-muted-foreground">
        Last updated: {formatToMediumDateTimeWithWeekday(item.updatedAt)}
      </p>
    </article>
  );
};

export default DocumentListItem;
