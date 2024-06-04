import JobCrudForm from "@/src/components/JobCrudForm";

const AddJobsPageClient = () => {
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
          Add a new job application
        </h1>
        <p className="text-muted-foreground text-lg w-full lg:w-[75%]">
          Register your job application by filling out the form below. It will be automatically added to the Jobs List
          page.
        </p>
      </div>
      <JobCrudForm mode="create" formClassName="2xl:grid-cols-3 w-full" />
    </div>
  );
};

export default AddJobsPageClient;
