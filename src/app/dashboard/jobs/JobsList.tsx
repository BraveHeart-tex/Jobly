import { JobApplication } from "@prisma/client";
import JobCard from "./JobCard";
import AnimateListPresence from "@/components/animations/AnimateListPresence";

interface IJobsListProps {
  jobApplications: JobApplication[];
}

const JobsList = async ({ jobApplications }: IJobsListProps) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-4 gap-6">
      <AnimateListPresence>
        {jobApplications.map((jobApplication, index) => (
          <JobCard key={jobApplication.id + index} jobApplication={jobApplication} />
        ))}
      </AnimateListPresence>
    </div>
  );
};

export default JobsList;
