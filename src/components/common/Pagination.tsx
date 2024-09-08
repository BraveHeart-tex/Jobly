"use client";

import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  currentPage: number;
}

const Pagination = ({
  hasNextPage,
  hasPreviousPage,
  totalPages,
  currentPage,
}: PaginationProps) => {
  const [page, setPage] = useQueryState(URL_SEARCH_QUERY_KEYS.PAGE, {
    defaultValue: "1",
  });

  const handlePrevious = () => {
    if (!hasPreviousPage) return;

    setPage((Number.parseInt(page) - 1).toString());
  };

  const handleNext = () => {
    if (!hasNextPage) return;

    setPage((Number.parseInt(page) + 1).toString());
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageNumbers = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) {
        pages.push(-1);
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push(-1);
      }
      pages.push(totalPages);
    }

    for (const page of pages) {
      if (page === -1) {
        pageNumbers.push(
          <span key={page} className="px-4 py-2 mx-1">
            ...
          </span>,
        );
      } else {
        pageNumbers.push(
          <Button
            key={page}
            onClick={() => setPage(page.toString())}
            variant="ghost"
            className={cn(
              currentPage === page && "bg-primary text-primary-foreground",
            )}
          >
            {page}
          </Button>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex items-start justify-center gap-2 mt-2">
      <Button
        variant="ghost"
        size="icon"
        aria-description="Go to previous page"
        onClick={handlePrevious}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft />
      </Button>
      <div className="flex items-center gap-2 justify-center">
        {renderPageNumbers()}
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-description="Go to next page"
        onClick={handleNext}
        disabled={!hasNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
