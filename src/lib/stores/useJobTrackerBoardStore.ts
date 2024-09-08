import type { Column } from "@/features/candidate/jobTrackerBoard/types";
import type { JobTrackerApplication } from "@/server/db/schema/jobTrackerApplications";
import { create } from "zustand";

const defaultCols = [
  {
    id: "shortlist" as const,
    title: "Shortlist",
  },
  {
    id: "applied" as const,
    title: "Applied",
  },
  {
    id: "interview" as const,
    title: "Interview",
  },
  {
    id: "offer" as const,
    title: "Offer",
  },
  {
    id: "rejected" as const,
    title: "Rejected",
  },
] satisfies Column[];

type JobTrackerBoardStore = {
  columns: Column[];
  setColumns: (
    columns: Column[] | ((prevColumns: Column[]) => Column[]),
  ) => void;
  trackedApplications: JobTrackerApplication[];
  setTrackedApplications: (
    applications:
      | JobTrackerApplication[]
      | ((
          prevApplications: JobTrackerApplication[],
        ) => JobTrackerApplication[]),
  ) => void;
  activeJob: JobTrackerApplication | null;
  setActiveJob: (job: JobTrackerApplication | null) => void;
};

export const useJobTrackerBoardStore = create<JobTrackerBoardStore>(
  (set, get) => ({
    columns: defaultCols,
    setColumns: (params) => {
      if (typeof params === "function") {
        const newColumns = params(get().columns);
        set({ columns: newColumns });
        return;
      }
      set({ columns: params });
    },
    trackedApplications: [],
    setTrackedApplications: (params) => {
      if (typeof params === "function") {
        const newApplications = params(get().trackedApplications);
        set({ trackedApplications: newApplications });
        return;
      }
      set({ trackedApplications: params });
    },
    activeJob: null,
    setActiveJob: (job: JobTrackerApplication | null) => {
      set({ activeJob: job });
    },
  }),
);

export type ColumnId = (typeof defaultCols)[number]["id"];
