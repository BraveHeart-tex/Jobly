import { getTotalJobStats } from "../../actions";
import { Card } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import React from "react";
import { AiOutlineClockCircle, AiOutlineDelete, AiOutlineHourglass } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { StatusMappings } from "../lib/types";

interface TotalJobApplicationStat {
  status: string;
  count: number;
}

const JobStatusCard = async () => {
  const result = await getTotalJobStats();

  if (result.error || !result.totalApplicationStats) return null;

  return (
    <>
      {result.totalApplicationStats.map((data: TotalJobApplicationStat) => (
        <Card
          key={data.status}
          className={cn(
            "rounded-md shadow-md bg-card border-b-4 p-4 hover:bg-opacity-95 transition-all duration-300 ease-in-out hover:cursor-pointer",
            getBorderBottomColorByStatus(data),
          )}
        >
          <h2 className="flex justify-between items-center mb-4 text-foreground/90">
            <span className="text-3xl">{data.count}</span>
            <span>
              {React.createElement(getIconByStatus(data), {
                size: 50,
              })}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">{getHeadingTextByStatus(data)}</p>
        </Card>
      ))}
    </>
  );
};

export default JobStatusCard;

const statusMappings: StatusMappings = {
  pending: {
    border: "border-b-orange-500",
    text: "Pending Applications",
    icon: AiOutlineClockCircle,
  },
  interview: {
    border: "border-b-blue-500",
    text: "Scheduled Interviews",
    icon: AiOutlineHourglass,
  },
  rejected: {
    border: "border-b-red-500",
    text: "Declined Applications",
    icon: AiOutlineDelete,
  },
  offer: {
    border: "border-b-green-500",
    text: "Offers Received",
    icon: FaMoneyBill,
  },
};

const getBorderBottomColorByStatus = (jobStatusData: TotalJobApplicationStat) => {
  return statusMappings[jobStatusData.status]?.border || "";
};

const getHeadingTextByStatus = (jobStatusData: TotalJobApplicationStat) => {
  return statusMappings[jobStatusData.status]?.text || "";
};

const getIconByStatus = (jobStatusData: TotalJobApplicationStat) => {
  return statusMappings[jobStatusData.status]?.icon || null;
};
