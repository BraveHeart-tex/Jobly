import DeleteJobDialog from "@/components/DeleteJobDialog";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

interface IJobCardFooterProps {
  id: number;
}

const JobCardFooter = ({ id }: IJobCardFooterProps) => {
  return (
    <div className="flex justify-between mt-1">
      <div className="flex gap-2">
        <Link
          className="text-gray-100 bg-facebook dark:bg-background hover:bg-facebook-300 dark:hover:bg-background/80 transition-all rounded-md px-4 font-semibold h-[35px] flex items-center justify-center"
          href={`/dashboard/jobs/${id}/edit`}
        >
          Edit
        </Link>
        <DeleteJobDialog jobId={id} />
      </div>
      <Link
        href={`dashboard/jobs/${id}`}
        className="flex items-center gap-2 bg-transparent transition-all text-facebook dark:text-foreground"
      >
        View Details <FiEye />
      </Link>
    </div>
  );
};
export default JobCardFooter;
