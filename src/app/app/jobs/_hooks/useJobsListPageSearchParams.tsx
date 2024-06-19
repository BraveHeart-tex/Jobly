"use client";
import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { useQueryState } from "nuqs";

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
    {
      defaultValue: "",
    },
  );

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
  };
};
