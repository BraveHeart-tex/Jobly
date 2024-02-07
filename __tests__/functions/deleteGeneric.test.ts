import * as genericModule from "@/lib/generic";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

const mockTable = {
  delete: jest.fn(),
};

describe("deleteGeneric", () => {
  beforeEach(() => {
    jest.spyOn(genericModule, "getTable").mockResolvedValue(mockTable);
  });

  it("returns the correct data for a valid query", async () => {
    mockTable.delete.mockResolvedValue(1 as never);

    const result = await genericModule.deleteGeneric({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
    });

    expect(result).toEqual({ data: 1 });
  });

  it("returns null for an invalid query", async () => {
    mockTable.delete.mockResolvedValue(0 as never);

    const result = await genericModule.deleteGeneric({
      tableName: "jobApplication",
      whereCondition: { id: 999 },
    });

    expect(result).toBeNull();
  });

  it("returns an error for an exception", async () => {
    mockTable.delete.mockRejectedValue(new Error("Database error") as never);

    const result = await genericModule.deleteGeneric({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
    });

    expect(result).toEqual({ error: "Database error" });
  });
});
