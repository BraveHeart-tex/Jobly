import JobsList from "./JobsList";
import JobSearchForm from "./JobSearchForm";

const JobsPageClient = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <JobSearchForm />
      <JobsList />
    </div>
  );
};

export default JobsPageClient;
