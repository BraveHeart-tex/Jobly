import JobCrudForm from "@/components/JobCrudForm";

const AddJobsPageClient = () => {
  return (
    <div className="flex flex-col gap-4 w-full xl:w-[50%]">
      <div className="flex flex-col gap-4">
        <h1 className="text-facebook text-4xl font-semibold capitalize">Add a new job application</h1>
        <p className="text-foreground/80 text-lg font-semibold w-full lg:w-[75%]">
          You can fill out the form below to register your job application. Your application will be automatically added
          to the list of jobs in the Jobs List page.
        </p>
      </div>
      <JobCrudForm mode="create" />
    </div>
  );
};

export default AddJobsPageClient;
