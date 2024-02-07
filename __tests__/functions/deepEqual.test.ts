import { deepEqual } from "@/lib/utils";
import { describe, expect, it } from "@jest/globals";

describe("deepEqual", () => {
  it("returns true for two identical objects", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2, c: { d: 3 } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it("returns false for two different objects", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2, c: { d: 4 } };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it("ignores specified fields when comparing objects", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2, c: { d: 4 } };
    expect(deepEqual(obj1, obj2, ["c"])).toBe(true);
  });

  it("return false if there is a different number of properties", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2 };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });
});
