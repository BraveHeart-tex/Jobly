import { convertResponseData } from "@/lib/utils";
import { describe, expect, it } from "@jest/globals";

describe("convertResponseData", () => {
  it("converts response data correctly", () => {
    const mockData = {
      formattedMonthlyApplications: [
        { date: "2022-01-01", count: 1 },
        { date: "2022-01-15", count: 2 },
        { date: "2022-02-01", count: 3 },
      ],
    };

    const expectedData = {
      formattedMonthlyApplications: [
        { date: "January 2022", count: 3 },
        { date: "February 2022", count: 3 },
      ],
    };

    const result = convertResponseData(mockData);

    expect(result).toEqual(expectedData);
  });
});
