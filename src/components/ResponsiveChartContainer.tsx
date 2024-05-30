import { getMonthlyChartData } from "../../actions";
import MotionDiv from "@/components/animations/MotionDiv";
import BarChartComponent from "./BarChartComponent";
import NoJobsFound from "@/components/NoJobsFound";

const ResponsiveChartContainer = async () => {
  const result = await getMonthlyChartData();

  if (result?.error) {
    return null;
  }

  if (result.monthlyApplicationsData && result?.monthlyApplicationsData.length === 0) {
    return <NoJobsFound />;
  }

  return (
    <div className="w-full h-[calc(100vh-400px)] flex flex-col gap-4 justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-primary">Your Applications by Month</h2>
        <p className="text-muted-foreground text-base">
          Below chart shows the number of applications you have submitted each month.
        </p>
      </div>
      <div className="flex-1 h-full">
        <BarChartComponent data={result.monthlyApplicationsData} />
      </div>
    </div>
  );
};

export default ResponsiveChartContainer;
