import JobCrudForm from "@/components/JobCrudForm";

const AddJobsPageClient = () => {
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col gap-4">
        <h1 className="text-facebook dark:text-foreground text-4xl font-semibold capitalize">
          Add a new job application
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-md w-full lg:w-[75%]">
          You can fill out the form below to register your job application. Your application will be automatically added
          to the list of jobs in the Jobs List page.
        </p>
      </div>
      <JobCrudForm mode="create" formClassName="2xl:grid-cols-3 w-full" />
    </div>
  );
};

export default AddJobsPageClient;
