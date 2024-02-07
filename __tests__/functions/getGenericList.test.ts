import * as genericModule from "@/lib/generic";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

const mockTable = {
  findMany: jest.fn(),
};

describe("getGenericList", () => {
  beforeEach(() => {
    jest.spyOn(genericModule, "getTable").mockResolvedValue(mockTable);
  });

  it("returns the correct data for a valid query", async () => {
    const mockData = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    mockTable.findMany.mockResolvedValue(mockData as never);

    const result = await genericModule.getGenericList<any>({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
      selectCondition: { id: true, name: true },
    });

    expect(result).toEqual({ data: mockData });
  });

  it("returns null for an invalid query", async () => {
    mockTable.findMany.mockResolvedValue(null as never);

    const result = await genericModule.getGenericList<any>({
      tableName: "jobApplication",
      whereCondition: { id: 999 },
      selectCondition: { id: true, name: true },
    });

    expect(result).toBeNull();
  });

  it("returns an error for an exception", async () => {
    mockTable.findMany.mockRejectedValue(new Error("Database error") as never);

    const result = await genericModule.getGenericList<any>({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
      selectCondition: { id: true, name: true },
    });

    expect(result).toEqual({ error: "Database error" });
  });
});
