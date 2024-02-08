import { formatDate } from "@/lib/utils";
import { describe, expect, test } from "@jest/globals";

describe("formatDate", () => {
  test("should return a formatted date", () => {
    expect(formatDate(new Date("2001-07-09"))).toBe("July 9, 2001");
  });
});
