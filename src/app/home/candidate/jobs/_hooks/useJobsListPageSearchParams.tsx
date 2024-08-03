"use client";
import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { jobPostings } from "@/server/db/schema";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export const useJobsListPageSearchParams = () => {
  const [currentJobId, setCurrentJobId] = useQueryState(
    URL_SEARCH_QUERY_KEYS.CURRENT_JOB_ID,
  );
  const [query, setQuery] = useQueryState(URL_SEARCH_QUERY_KEYS.QUERY, {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState(URL_SEARCH_QUERY_KEYS.PAGE, {
    defaultValue: "1",
  });
  const [bookmarked, setBookmarked] = useQueryState(
    URL_SEARCH_QUERY_KEYS.BOOKMARKED_JOBS,
    {
      defaultValue: "",
    },
  );
  const [viewed, setViewed] = useQueryState(URL_SEARCH_QUERY_KEYS.VIEWED_JOBS, {
    defaultValue: "",
  });

  const [workType, setWorkType] = useQueryState(
    URL_SEARCH_QUERY_KEYS.JOB_WORK_TYPE,
    parseAsStringLiteral(jobPostings.workType.enumValues),
  );

  const [employmentType, setEmploymentType] = useQueryState(
    URL_SEARCH_QUERY_KEYS.JOB_EMPLOYMENT_TYPE,
    parseAsStringLiteral(jobPostings.employmentType.enumValues),
  );
  const [view, setView] = useQueryState(
    URL_SEARCH_QUERY_KEYS.JOB_LIST_VIEW,
    parseAsStringLiteral(["list", "jobDetails"]).withDefault("list"),
  );

  const clearAllFilters = () => {
    setBookmarked("false");
    setViewed("false");
    setWorkType(null);
    setEmploymentType(null);
    setView("list");
  };

  return {
    currentJobId,
    setCurrentJobId,
    query,
    setQuery,
    page,
    setPage,
    bookmarked,
    setBookmarked,
    viewed,
    setViewed,
    workType,
    setWorkType,
    employmentType,
    setEmploymentType,
    view,
    setView,
    clearAllFilters,
  };
};
