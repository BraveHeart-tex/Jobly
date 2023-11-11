import JobCrudForm from "@/components/JobCrudForm";

const AddJobsPageClient = () => {
  return (
    <div className="flex flex-col gap-4 w-full 2xl:w-[75%]">
      <div className="flex flex-col gap-4">
        <h1 className="text-facebook dark:text-foreground text-4xl font-semibold capitalize">
          Add a new job application
        </h1>
        <p className="text-foreground/80 dark:text-foreground/70 text-md lg:text-lg font-semibold w-full lg:w-[75%]">
          You can fill out the form below to register your job application. Your application will be automatically added
          to the list of jobs in the Jobs List page.
        </p>
      </div>
      <JobCrudForm mode="create" formClassName="2xl:grid-cols-2" />
    </div>
  );
};

export default AddJobsPageClient;
