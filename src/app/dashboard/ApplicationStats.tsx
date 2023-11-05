import JobStatusCard from "@/components/JobStatusCard";
import ResponsiveChartContainer from "../components/ResponsiveChartContainer";

const ApplicationStats = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <JobStatusCard />
      </div>
      <div className="mt-[64px]">
        <ResponsiveChartContainer />
      </div>
    </div>
  );
};

export default ApplicationStats;
