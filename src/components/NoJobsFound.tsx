import Link from "next/link";

const NoJobsFound = () => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-facebook dark:text-foreground font-semibold text-3xl">
        You don't have any applications yet.
      </h2>
      <span className="text-foreground/80">
        You need to add your job application first. Click the button below to get started!
      </span>
      <Link
        href="/dashboard/jobs/add"
        className="mt-2 bg-facebook text-white rounded-md w-max px-4 py-2 font-semibold hover:bg-facebook-600 transition-all dark:bg-primary dark:hover:bg-primary/80"
      >
        Get Started
      </Link>
    </div>
  );
};

export default NoJobsFound;
