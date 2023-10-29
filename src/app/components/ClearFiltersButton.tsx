"use client";
import Link from "next/link";

const ClearFiltersButton = () => {
  return (
    <Link
      onClick={() => {
        const form = document.getElementById("jobSearchForm") as HTMLFormElement;
        form.reset();
      }}
      href="/dashboard/jobs"
      className="w-full md:w-max text-gray-50 bg-destructive rounded-md p-2 font-semibold hover:bg-destructive/80 transition-all text-center"
    >
      Clear Filters
    </Link>
  );
};
export default ClearFiltersButton;
