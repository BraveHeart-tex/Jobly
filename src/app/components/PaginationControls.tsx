import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface IPaginationControlsProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
}

const PaginationControls = ({ currentPage, hasNextPage, hasPreviousPage }: IPaginationControlsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-4 select-none">
      <Link
        scroll={false}
        href={`/dashboard/jobs?page=${currentPage - 1}`}
        className={cn(
          "bg-facebook text-gray-100 flex items-center gap-2 rounded-md p-2",
          !hasPreviousPage && "opacity-50 pointer-events-none"
        )}
      >
        <FaArrowLeft /> Previous
      </Link>
      <Link
        scroll={false}
        href={`/dashboard/jobs?page=${currentPage + 1}`}
        className={cn(
          "bg-facebook text-gray-100 flex items-center gap-2 rounded-md p-2",
          !hasNextPage && "opacity-50 pointer-events-none"
        )}
      >
        Next <FaArrowRight />
      </Link>
    </div>
  );
};
export default PaginationControls;
