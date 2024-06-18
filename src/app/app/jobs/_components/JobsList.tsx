"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useQueryState } from "nuqs";
import React, {
  type LegacyRef,
  type RefObject,
  useEffect,
  useRef,
} from "react";
import JobDetails from "./JobDetails";
import JobsListCard from "./JobsListCard";
import { useJobListViewStore } from "@/lib/stores/useJobListViewStore";
import { cn, exclude } from "@/lib/utils";
import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

const JobsList = () => {
  const [currentJobId, setCurrentJobId] = useQueryState(
    URL_SEARCH_QUERY_KEYS.CURRENT_JOB_ID,
  );
  const [query, setQuery] = useQueryState(URL_SEARCH_QUERY_KEYS.QUERY, {
    defaultValue: "",
  });
  const [page] = useQueryState(URL_SEARCH_QUERY_KEYS.PAGE, {
    defaultValue: "1",
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);
  const { setView, view } = useJobListViewStore();

  const { data: jobListingsResponse, isPending: isPendingJobs } =
    api.job.getJobListings.useQuery({
      query,
      page: Number.parseInt(page),
    });

  const jobs = jobListingsResponse?.jobListings;

  if (jobs && jobs?.length > 0) {
    itemRefs.current = jobs.map(() => React.createRef<HTMLDivElement>());
  }

  useEffect(() => {
    const updateCurrentJobIdAndView = () => {
      const firstJobId = jobs?.[0]?.id.toString() || "";
      setCurrentJobId(firstJobId);
      setView("jobDetail");
    };
    if (!Array.isArray(jobs) || jobs.length === 0) return;

    const currentJobNotFound =
      currentJobId &&
      !jobs.find((job) => job.id === Number.parseInt(currentJobId));

    if (!currentJobId || currentJobNotFound) {
      updateCurrentJobIdAndView();
    }
  }, [jobs, currentJobId, setCurrentJobId, setView]);

  useEffect(() => {
    const scrollToActiveItem = (
      container: HTMLDivElement,
      activeItem: HTMLDivElement,
    ) => {
      if (!container || !activeItem) return;

      const containerRect = container?.getBoundingClientRect();
      const itemRect = activeItem?.getBoundingClientRect();

      const offsetTop = itemRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: offsetTop - containerRect.height / 2 + itemRect.height / 2,
        behavior: "smooth",
      });
    };

    if (!jobs || !currentJobId) return;
    const activeItemIndex = jobs.findIndex(
      (job) => job.id === Number.parseInt(currentJobId),
    );
    if (
      activeItemIndex === -1 ||
      !itemRefs?.current[activeItemIndex] ||
      !containerRef.current
    )
      return;

    const container = containerRef.current;
    const activeItem = itemRefs.current[activeItemIndex]?.current;
    if (!container || !activeItem) return;
    scrollToActiveItem(container, activeItem);
    setView("jobDetail");
  }, [currentJobId, jobs, setView]);

  const renderJobs = () => {
    if (query && jobs?.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center gap-1 h-[calc(100vh-120px)]">
          <h2 className="scroll-m-20 text-2xl tracking-tight">
            No results found for: <span className="font-bold">{query}</span>
          </h2>
          <Button onClick={() => setQuery("")}>Clear Search</Button>
        </div>
      );
    }

    if (!jobs || jobs.length === 0) return null;

    const paginationProps = exclude(jobListingsResponse, ["jobListings"]);

    return (
      <>
        {jobs?.map((job, index) => (
          <JobsListCard
            ref={itemRefs?.current[index] as LegacyRef<HTMLDivElement>}
            key={job.id}
            job={job}
          />
        ))}
        <Pagination {...paginationProps} />
      </>
    );
  };

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <Skeleton
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        className="rounded-md p-4 h-52"
      />
    ));

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div
        ref={containerRef}
        className={cn(
          "lg:col-span-4 grid h-[calc(100vh-110px)] grid-cols-1 gap-1 overflow-auto p-1 pt-0 auto-rows-min",
          view === "jobDetail" && "hidden lg:grid",
        )}
      >
        {isPendingJobs ? renderSkeletons() : renderJobs()}
      </div>
      <div
        className={cn(
          "lg:col-span-8 h-[calc(100vh-110px)]",
          view === "jobDetail" && "h-full w-full lg:h-[calc(100vh-110px)]",
          view === "list" && "hidden lg:inline-block",
        )}
      >
        {currentJobId ? (
          <JobDetails currentJobId={Number.parseInt(currentJobId)} />
        ) : null}
      </div>
    </div>
  );
};

export default JobsList;
