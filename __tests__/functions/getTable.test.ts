import { getTable } from "@/lib/generic";
import { describe, expect, it } from "@jest/globals";
import { prismaMock } from "../../mocks/prismaMock";

describe("getTable", () => {
  it("returns the correct table for a valid table name", async () => {
    const table = await getTable("jobApplication");
    expect(table).toBe(prismaMock.jobApplication);
  });

  it("throws an error for an invalid table name", async () => {
    await expect(getTable("invalidTable" as any)).rejects.toThrow("Table not found");
  });
});
