import * as genericModule from "@/lib/generic";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

const mockTable = {
  update: jest.fn(),
};

describe("updateGeneric", () => {
  beforeEach(() => {
    jest.spyOn(genericModule, "getTable").mockResolvedValue(mockTable);
  });

  it("returns the correct data for a valid query", async () => {
    mockTable.update.mockResolvedValue(1 as never);

    const result = await genericModule.updateGeneric<any>({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
      data: { name: "John Doe" },
    });

    expect(result).toEqual({ data: 1 });
  });

  it("returns null for an invalid query", async () => {
    mockTable.update.mockResolvedValue(0 as never);

    const result = await genericModule.updateGeneric<any>({
      tableName: "jobApplication",
      whereCondition: { id: 999 },
      data: { name: "John Doe" },
    });

    expect(result).toBeNull();
  });

  it("returns an error for an exception", async () => {
    mockTable.update.mockRejectedValue(new Error("Database error") as never);

    const result = await genericModule.updateGeneric<any>({
      tableName: "jobApplication",
      whereCondition: { id: 1 },
      data: { name: "John Doe" },
    });

    expect(result).toEqual({ error: "Database error" });
  });
});
