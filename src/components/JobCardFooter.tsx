import DeleteJobDialog from "@/src/components/DeleteJobDialog";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

interface IJobCardFooterProps {
  id: number;
}

const JobCardFooter = ({ id }: IJobCardFooterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-between mt-1">
      <div className="flex gap-2">
        <Link
          aria-label="Edit Job Details"
          className="text-gray-100 bg-facebook dark:bg-background hover:bg-facebook-300 dark:hover:bg-background/80 transition-all rounded-md px-4 font-semibold h-[35px] flex items-center justify-center gap-2"
          href={`/dashboard/jobs/${id}/edit`}
        >
          <FaPencilAlt />
          Edit
        </Link>
        <DeleteJobDialog jobId={id} />
      </div>
      <Link
        href={`/dashboard/jobs/${id}`}
        aria-label="View Job Details"
        className="flex items-center gap-2 bg-transparent transition-all text-facebook dark:text-foreground"
      >
        View Details <FiEye />
      </Link>
    </div>
  );
};
export default JobCardFooter;
