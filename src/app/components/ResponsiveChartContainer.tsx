import { getMonthlyChartData } from "../actions";
import BarChartComponent from "./Charts/BarChartComponent";

const ResponsiveChartContainer = async () => {
  const result = await getMonthlyChartData();

  if (result?.error) {
    return null;
  }

  return (
    <div className="flex justify-center items-start flex-col gap-4">
      <h2 className="font-semibold text-foreground text-4xl text-facebook">Your Applications by Month</h2>
      <p className="text-foreground">Below chart shows the number of applications you have submitted each month.</p>
      <div className="w-full h-[400px] flex justify-center items-center">
        <BarChartComponent data={result.monthlyApplicationsData} />
      </div>
    </div>
  );
};

export default ResponsiveChartContainer;
