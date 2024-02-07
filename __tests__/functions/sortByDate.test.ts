import { sortByDate } from "@/lib/utils";
import { describe, expect, it } from "@jest/globals";

describe("sortByDate", () => {
  it("sorts by date in descending order by default", () => {
    const arr = [{ date: "2022-01-01" }, { date: "2022-01-02" }];
    const sortedArr = arr.sort((a, b) => sortByDate(a, b, "date"));
    expect(sortedArr).toEqual([{ date: "2022-01-02" }, { date: "2022-01-01" }]);
  });

  it("sorts by date in ascending order when specified", () => {
    const arr = [{ date: "2022-01-01" }, { date: "2022-01-02" }];
    const sortedArr = arr.sort((a, b) => sortByDate(a, b, "date", "asc"));
    expect(sortedArr).toEqual([{ date: "2022-01-01" }, { date: "2022-01-02" }]);
  });
});
