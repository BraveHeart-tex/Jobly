import Link from "next/link";
import { getMonthlyChartData } from "../actions";
import BarChartComponent from "./Charts/BarChartComponent";

const ResponsiveChartContainer = async () => {
  const result = await getMonthlyChartData();

  if (result?.error) {
    return null;
  }

  if (result.monthlyApplicationsData && result?.monthlyApplicationsData.length === 0) {
    return (
      <div className="flex flex-col gap-1">
        <h2 className="text-facebook dark:text-foreground font-semibold text-3xl">
          You don't have any applications yet.
        </h2>
        <span className="text-foreground/80">
          You need to add your job application first. Click the button below to get started!
        </span>
        <Link
          href="/dashboard/jobs/add"
          className="mt-2 bg-facebook text-white rounded-md w-max px-4 py-2 font-semibold hover:bg-facebook-600 transition-all dark:bg-primary dark:hover:bg-primary/80"
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start flex-col gap-4">
      <h2 className="font-semibold text-foreground text-4xl text-facebook capitalize">Your Applications by Month</h2>
      <p className="text-foreground">Below chart shows the number of applications you have submitted each month.</p>
      <div className="w-full h-[400px] flex justify-center items-center">
        <BarChartComponent data={result.monthlyApplicationsData} />
      </div>
    </div>
  );
};

export default ResponsiveChartContainer;
