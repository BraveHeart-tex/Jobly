import SalaryDataTable from "./SalaryDataTable";
import SalaryDataFilterForm from "./SalaryDataFilterForm";
import Link from "next/link";
import { searchSalaryDataset } from "../../../../actions";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cn } from "@/src/lib/utils";
import AnimationRoot from "@/src/components/animations/AnimationRoot";

const SalaryEstimationsPage = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
    sort: string;
    search: string;
    city: string;
  };
}) => {
  const page = searchParams.page || "1";
  const sort = searchParams.sort || "asc";
  const search = searchParams.search || "";
  const city = searchParams.city || "";

  const result = await searchSalaryDataset(page, sort, search, city);
  let data = null;
  if (result.salaryData) {
    data = result.salaryData;
  }

  return (
    <AnimationRoot>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground">
            Salary Estimations
          </h3>
          <p className="text-muted-foreground text-lg w-full lg:w-[75%]">
            Explore salary estimates from multiple sources. Use the form below to filter the data.
          </p>
        </div>
        <SalaryDataFilterForm />
        {data ? <SalaryDataTable data={data} /> : null}
        <div className="flex gap-4 w-full justify-center self-start items-center">
          <Link
            scroll={false}
            href={`/dashboard/salaries?page=${parseInt(page) - 1}&sort=${sort}&search=${search}&city=${city}`}
            className={cn(
              "bg-facebook dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-100 flex items-center gap-2 rounded-md p-2",
              !result?.hasPreviousPage && "opacity-50 pointer-events-none",
            )}
          >
            <FaArrowLeft /> Previous
          </Link>
          <p className="text-muted-foreground">
            Page {page} of {result?.totalPages}
          </p>
          <Link
            scroll={false}
            href={`/dashboard/salaries?page=${parseInt(page) + 1}&sort=${sort}&search=${search}&city=${city}`}
            className={cn(
              "bg-facebook dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-100 flex items-center gap-2 rounded-md p-2",
              !result?.hasNextPage && "opacity-50 pointer-events-none",
            )}
          >
            Next <FaArrowRight />
          </Link>
        </div>
      </div>
    </AnimationRoot>
  );
};

export default SalaryEstimationsPage;
