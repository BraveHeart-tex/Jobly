import { JobApplication } from "@prisma/client";
import JobCard from "./JobCard";

interface IJobsListProps {
  jobApplications: JobApplication[];
}

const JobsList = async ({ jobApplications }: IJobsListProps) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
      {jobApplications.map((jobApplication) => (
        <JobCard key={jobApplication.id} jobApplication={jobApplication} />
      ))}
    </div>
  );
};

export default JobsList;
