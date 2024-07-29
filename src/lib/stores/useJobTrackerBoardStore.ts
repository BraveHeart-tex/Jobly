import type { JobTrackerApplicationStatus } from "@/server/db/schema";
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
  activeColumn: Column | null;
  setActiveColumn: (column: Column) => void;
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
    activeColumn: null,
    setActiveColumn: (column: Column) => {
      set({ activeColumn: column });
    },
  }),
);

export type Column = {
  id: JobTrackerApplicationStatus;
  title: string;
};

export type ColumnId = (typeof defaultCols)[number]["id"];
