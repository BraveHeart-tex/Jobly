import { create } from "zustand";

type JobListView = "list" | "jobDetail";

type JobListViewStore = {
  view: JobListView;
  setView: (view: JobListView) => void;
};

export const useJobListViewStore = create<JobListViewStore>((set) => ({
  view: "list",
  setView: (view: JobListView) => set({ view: view }),
}));
