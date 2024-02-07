import * as genericModule from "@/lib/generic";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

const mockTable = {
  create: jest.fn(),
};

describe("createGeneric", () => {
  beforeEach(() => {
    jest.spyOn(genericModule, "getTable").mockResolvedValue(mockTable);
  });

  it("returns the correct data for a valid query", async () => {
    const mockData = { id: 1, name: "John Doe" } as never;

    mockTable.create.mockResolvedValue(mockData);

    const result = await genericModule.createGeneric<any>({
      tableName: "jobApplication",
      data: { name: "John Doe" },
    });

    expect(result).toEqual({ data: mockData });
  });

  it("returns an error for an exception", async () => {
    mockTable.create.mockRejectedValue(new Error("Database error") as never);

    const result = await genericModule.createGeneric<any>({
      tableName: "jobApplication",
      data: { name: "John Doe" },
    });

    expect(result).toEqual({ error: "Database error" });
  });
});
