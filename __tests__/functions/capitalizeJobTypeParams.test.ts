import { capitalizeJobTypeParams } from "@/lib/utils";
import { describe, test, expect } from "@jest/globals";

describe("capitalizeJobTypeParams", () => {
  test("should return Part-Time when value is part-time", () => {
    expect(capitalizeJobTypeParams("part-time")).toBe("Part-Time");
  });

  test("should return Part-Time when value is Part-time", () => {
    expect(capitalizeJobTypeParams("Part-time")).toBe("Part-Time");
  });

  test("should return Full-Time when value is full-time", () => {
    expect(capitalizeJobTypeParams("full-time")).toBe("Full-Time");
  });

  test("should return Full-Time when value is Full-time", () => {
    expect(capitalizeJobTypeParams("Full-time")).toBe("Full-Time");
  });

  test("should return Volunteer when value is Volunteer", () => {
    expect(capitalizeJobTypeParams("Volunteer")).toBe("Volunteer");
  });
});
