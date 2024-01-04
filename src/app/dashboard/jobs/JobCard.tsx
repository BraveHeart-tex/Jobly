import { TfiLocationPin } from "react-icons/tfi";
import { BsBriefcase, BsCalendarDay, BsInfoCircle } from "react-icons/bs";
import { JobApplication } from "@prisma/client";
import formatDate from "@/app/utils/formatDate";
import ApplicationStatusOptions from "@/app/utils/ApplicationStatusOptions";
import JobTypeOptions from "@/app/utils/JobTypeOptions";
import JobCardHeader from "@/app/components/JobCardHeader";
import JobCardFooter from "@/app/components/JobCardFooter";
import MotionDiv from "@/app/animations/MotionDiv";

interface IJobCardProps {
  jobApplication: JobApplication;
}

const JobCard = ({ jobApplication }: IJobCardProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "just" }}
      exit={{ opacity: 0, y: 20, transition: { duration: 5, type: "just" } }}
      key={jobApplication.id}
      layoutId={`job-card-${jobApplication.id}`}
      className="relative p-6 bg-card dark:bg-gray-800 shadow-md rounded-md flex justify-between flex-col"
    >
      <div className="border-b dark:border-b-gray-500 mb-2 text-ellipsis truncate">
        <JobCardHeader companyName={jobApplication.companyName} jobTitle={jobApplication.jobTitle} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* Job Card Info */}
        <div className="grid grid-cols-2 gap-4 text-foreground">
          {/* Location Info */}
          <div className="flex gap-4 items-center text-ellipsis truncate">
            <span>
              <TfiLocationPin />
            </span>
            <span>{jobApplication.location}</span>
          </div>
          {/* Location Info End */}
          {/* Job Type Start */}
          <div className="flex gap-4 items-center">
            <span>
              <BsBriefcase />
            </span>
            <span>{JobTypeOptions[jobApplication.jobType]}</span>
          </div>
          {/* Job Type End */}
          {/* Created At Start */}
          <div className="flex gap-4 items-center">
            <span>
              <BsCalendarDay />
            </span>
            <span>{formatDate(new Date(jobApplication.createdAt))}</span>
          </div>
          {/* Created At End */}
          {/* Application Status Start */}
          <div className="flex items-center gap-4">
            <span>
              <BsInfoCircle />
            </span>
            <span>{ApplicationStatusOptions[jobApplication.applicationStatus]}</span>
          </div>
          {/* Application Status End */}
        </div>
        <JobCardFooter id={jobApplication.id} />
      </div>
    </MotionDiv>
  );
};

export default JobCard;
