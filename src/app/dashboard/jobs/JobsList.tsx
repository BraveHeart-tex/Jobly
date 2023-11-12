import { JobApplication } from "@prisma/client";
import JobCard from "./JobCard";
import AnimateListPresence from "@/app/animations/AnimateListPresence";

interface IJobsListProps {
  jobApplications: JobApplication[];
}

const JobsList = async ({ jobApplications }: IJobsListProps) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
      <AnimateListPresence>
        {jobApplications.map((jobApplication) => (
          <JobCard key={jobApplication.id} jobApplication={jobApplication} />
        ))}
      </AnimateListPresence>
    </div>
  );
};

export default JobsList;
