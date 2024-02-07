import * as genericModule from "@/lib/generic";
import { describe, jest, it, expect, beforeEach } from "@jest/globals";

const mockTable = {
  findFirst: jest.fn(),
};

describe("getGeneric", () => {
  beforeEach(() => {
    jest.spyOn(genericModule, "getTable").mockResolvedValue(mockTable);
  });
  it("returns the correct data for a valid query", async () => {
    const mockData = { id: 1, name: "John Doe" } as never;

    mockTable.findFirst.mockResolvedValue(mockData);

    const result = await genericModule.getGeneric<any>({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
      selectCondition: { id: true, name: true },
    });

    expect(result).toEqual({ data: mockData });
  });

  it("returns an error for an invalid query", async () => {
    mockTable.findFirst.mockResolvedValue(null as never);

    const result = await genericModule.getGeneric<any>({
      tableName: "jobApplication",
      whereCondition: { id: 999 },
      selectCondition: { id: true, name: true },
    });

    expect(result).toEqual({ error: "Not found" });
  });

  it("returns an error for an exception", async () => {
    mockTable.findFirst.mockRejectedValue(new Error("Database error") as never);

    const result = await genericModule.getGeneric<any>({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
      selectCondition: { id: true, name: true },
    });

    expect(result).toEqual({ error: "Database error" });
  });
});
