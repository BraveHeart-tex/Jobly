export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  baseObject: T,
  keysToPick: K[],
): Partial<T> => {
  return keysToPick.reduce(
    (acc, key) => {
      if (key in baseObject) {
        acc[key] = baseObject[key];
      }
      return acc;
    },
    {} as Partial<T>,
  );
};

export const exclude = <T extends Record<string, unknown>, K extends keyof T>(
  baseObject: T,
  keysToRemove: K[],
): Omit<T, K> => {
  if (!baseObject) return {} as Omit<T, K>;
  return (Object.keys(baseObject) as K[]).reduce(
    (acc, key) => {
      if (!keysToRemove.includes(key)) {
        // @ts-ignore
        acc[key] = baseObject[key];
      }
      return acc;
    },
    {} as Omit<T, K>,
  );
};

export const groupEveryN = <T>(array: T[], n: number): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += n) {
    result.push(array.slice(i, i + n));
  }

  return result;
};

export const parseSectionMetadata = (metadata: string | null | undefined) => {
  if (!metadata) return {};
  try {
    return JSON.parse(metadata);
  } catch (error) {
    console.info("Error parsing metadata:", error);
    return {};
  }
};

export const compareMatchingKeys = (
  obj1: Record<string, unknown> | null | undefined,
  obj2: Record<string, unknown> | null | undefined,
): boolean => {
  if (
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined
  ) {
    return obj1 === obj2;
  }

  const matchingKeys = Object.keys(obj1).filter((key) => key in obj2);
  return matchingKeys.every((key: string) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (
      value1 === null ||
      value2 === null ||
      value1 === undefined ||
      value2 === undefined
    ) {
      return value1 === value2;
    }
    if (typeof value1 === "object" && typeof value2 === "object") {
      return compareMatchingKeys(
        value1 as Record<string, unknown>,
        value2 as Record<string, unknown>,
      );
    }
    return value1 === value2;
  });
};

export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T[]> => {
  return array.reduce(
    (result, currentValue) => {
      const groupKey = String(currentValue[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey]?.push(currentValue);
      return result;
    },
    {} as Record<string, T[]>,
  );
};

export const getUniqueValuesFromMap = <T extends Record<string, unknown>>(
  map: T,
): T[keyof T][] => {
  return [...new Set(Object.values(map) as T[keyof T][])];
};

export const isObjectEmpty = <T extends Record<string, unknown>>(obj: T) => {
  return Object.keys(obj).length === 0;
};
