import { getMonthlyChartData } from "@/app/actions";
import MotionDiv from "@/app/animations/MotionDiv";
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
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="flex justify-center items-start flex-col gap-2"
    >
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
        Your Applications by Month
      </h2>
      <p className="text-muted-foreground text-lg">
        Below chart shows the number of applications you have submitted each month.
      </p>
      <div className="w-full h-[400px] flex justify-center items-center">
        <BarChartComponent data={result.monthlyApplicationsData} />
      </div>
    </MotionDiv>
  );
};

export default ResponsiveChartContainer;
