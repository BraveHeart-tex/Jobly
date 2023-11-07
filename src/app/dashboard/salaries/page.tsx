import SalaryDataTable from "./SalaryDataTable";
import SalaryDataFilterForm from "./SalaryDataFilterForm";
import Link from "next/link";
import { searchSalaryDataset } from "@/app/actions";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

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
    <main>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-facebook dark:text-facebook-300 font-semibold text-4xl">Salary Estimations</h2>
          <p className="text-foreground">
            You can use this page to estimate your salary based on your location or job title.
          </p>
        </div>
        <SalaryDataFilterForm />
        <div className="flex gap-4 justify-center self-start items-center">
          <Link
            scroll={false}
            href={`/dashboard/salaries?page=${parseInt(page) - 1}&sort=${sort}&search=${search}&city=${city}`}
            className={cn(
              "bg-facebook text-gray-100 flex items-center font-semibold gap-2 rounded-md p-2",
              !result?.hasPreviousPage && "opacity-50 pointer-events-none"
            )}
          >
            <FaArrowLeft /> Previous
          </Link>
          <Link
            scroll={false}
            href={`/dashboard/salaries?page=${parseInt(page) + 1}&sort=${sort}&search=${search}&city=${city}`}
            className={cn(
              "bg-facebook text-gray-100 flex font-semibold items-center gap-2 rounded-md p-2",
              !result?.hasNextPage && "opacity-50 pointer-events-none"
            )}
          >
            Next <FaArrowRight />
          </Link>
        </div>
        {data ? <SalaryDataTable data={data} /> : null}
      </div>
    </main>
  );
};

export default SalaryEstimationsPage;
