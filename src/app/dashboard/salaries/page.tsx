import SalaryDataTable from "./SalaryDataTable";
import SalaryDataFilterForm from "./SalaryDataFilterForm";
import Link from "next/link";
import { searchSalaryDataset } from "@/app/actions";

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
        {data ? <SalaryDataTable data={data} /> : null}
        <p className="text-foreground">Showing 10 results per page by default.</p>
        <div className="flex gap-4 justify-center items-center">
          <Link href="" className="bg-facebook rounded-md text-white font-semibold px-4 py-2">
            Previous
          </Link>
          <Link href="" className="bg-facebook rounded-md text-white font-semibold px-4 py-2">
            Next
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SalaryEstimationsPage;
