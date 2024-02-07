import { mapTotalApplicationStatsToStatusCounts } from "@/lib/utils";
import { describe, expect, it } from "@jest/globals";

describe("mapTotalApplicationStatsToStatusCounts", () => {
  it("maps total application stats to status counts", () => {
    const mockTotalApplicationStats = [
      { _count: { applicationStatus: 2 }, applicationStatus: "APPLIED" },
      { _count: { applicationStatus: 1 }, applicationStatus: "INTERVIEW" },
    ];

    const expectedStatusCounts = [
      { status: "applied", count: 2 },
      { status: "interview", count: 1 },
    ];

    const result = mapTotalApplicationStatsToStatusCounts(mockTotalApplicationStats);

    expect(result).toEqual(expectedStatusCounts);
  });
});
