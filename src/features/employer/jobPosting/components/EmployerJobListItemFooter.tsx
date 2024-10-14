"use client";
import { formatToMediumDateTimeWithWeekday } from "@/lib/utils/date";

interface EmployerJobListItemFooterProps {
  postedAt: string;
  createdUserName: string;
}

const EmployerJobListItemFooter = ({
  postedAt,
  createdUserName,
}: EmployerJobListItemFooterProps) => {
  return (
    <footer className="mt-auto self-end text-muted-foreground text-sm">
      <p>Posted at {formatToMediumDateTimeWithWeekday(postedAt)}</p>
      <p>Created by {createdUserName}</p>
    </footer>
  );
};

export default EmployerJobListItemFooter;
