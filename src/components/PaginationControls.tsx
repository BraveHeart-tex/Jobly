import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface IPaginationControlsProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  search: string;
  company: string;
  status: string;
  jobType: string;
  sort: string;
}

const PaginationControls = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  search,
  company,
  status,
  jobType,
  sort,
}: IPaginationControlsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-4 select-none">
      <Link
        scroll={false}
        href={`/dashboard/jobs?search=${search}&company=${company}&status=${status}&jobType=${jobType}&sort=${sort}&page=${
          currentPage - 1
        }`}
        className={cn(
          "bg-facebook dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-100 flex items-center gap-2 rounded-md p-2",
          !hasPreviousPage && "opacity-50 pointer-events-none",
        )}
      >
        <FaArrowLeft /> Previous
      </Link>
      <Link
        scroll={false}
        href={`/dashboard/jobs?search=${search}&company=${company}&status=${status}&jobType=${jobType}&sort=${sort}&page=${
          currentPage + 1
        }`}
        className={cn(
          "bg-facebook dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-100 flex items-center gap-2 rounded-md p-2",
          !hasNextPage && "opacity-50 pointer-events-none",
        )}
      >
        Next <FaArrowRight />
      </Link>
    </div>
  );
};
export default PaginationControls;
