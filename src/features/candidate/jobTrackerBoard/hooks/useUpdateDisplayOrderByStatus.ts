"use client";
import { useJobTrackerBoardStore } from "@/lib/stores/useJobTrackerBoardStore";
import { groupBy } from "@/lib/utils/object";
import type { JobTrackerApplication } from "@/server/db/schema/jobTrackerApplications";
import { api } from "@/trpc/react";

export const useUpdateDisplayOrderByStatus = () => {
  const setTrackedApplications = useJobTrackerBoardStore(
    (state) => state.setTrackedApplications,
  );
  const { mutate: updateApplicationStatusAndDisplayOrders } =
    api.jobTracker.updateStatusAndOrder.useMutation();

  const updateDisplayOrderByStatus = (
    previousTrackedApplications: JobTrackerApplication[],
  ) => {
    const groupedApplications = groupBy(previousTrackedApplications, "status");

    for (const status of Object.keys(groupedApplications)) {
      const grouped = groupedApplications[status];
      if (grouped !== undefined) {
        groupedApplications[status] = grouped.map((item, index) => ({
          ...item,
          displayOrder: index + 1,
        }));
      }
    }

    const updatedTrackedApplications =
      Object.values(groupedApplications).flat();

    setTrackedApplications(updatedTrackedApplications);
    updateApplicationStatusAndDisplayOrders({
      data: updatedTrackedApplications,
    });
  };

  return { updateDisplayOrderByStatus };
};
