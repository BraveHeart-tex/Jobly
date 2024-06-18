"use client";

import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { useQueryState } from "nuqs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  currentPage: number;
};

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
    const pageNumbers = [];
    for (let index = 1; index <= totalPages; index++) {
      pageNumbers.push(
        <Button
          type="button"
          variant="ghost"
          key={index}
          aria-description={`Go to page number ${index}`}
          onClick={() => setPage(index.toString())}
          className={cn(
            currentPage === index && "bg-primary text-primary-foreground",
          )}
        >
          {index}
        </Button>,
      );
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
