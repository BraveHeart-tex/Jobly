import Link from "next/link";

interface INoJobsFoundProps {
  withQuery?: boolean;
}

const NoJobsFound = ({ withQuery }: INoJobsFoundProps) => {
  if (withQuery) {
    return (
      <div className="flex flex-col gap-1">
        <h2 className="text-facebook dark:text-foreground font-semibold text-3xl capitalize">
          No Applications Found for Your Search
        </h2>
        <span className="text-foreground/80">Try changing your search parameters or add a new application.</span>
        <Link
          href="/dashboard/jobs/add"
          className="mt-2 bg-facebook text-white rounded-md w-max px-4 py-2 font-semibold hover:bg-facebook-600 transition-all dark:bg-primary dark:hover:bg-primary/80"
        >
          Add a new Application
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-facebook dark:text-foreground font-semibold text-3xl">
        You don't have any applications yet.
      </h2>
      <span className="text-gray-500 dark:text-gray-400 text-md w-full lg:w-[70%]">
        You need to add your job application first. Click the button below to get started!
      </span>
      <Link
        href="/dashboard/jobs/add"
        className="mt-2 bg-facebook dark:bg-gray-700 text-white rounded-md w-max px-4 py-2 font-semibold hover:bg-facebook-600 transition-all  dark:hover:bg-gray-600"
      >
        Get Started
      </Link>
    </div>
  );
};

export default NoJobsFound;
