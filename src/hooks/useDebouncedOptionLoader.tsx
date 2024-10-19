import type { OptionType } from "@/components/common/select/types";
import debounce from "lodash.debounce";

const DEFAULT_DEBOUNCED_FETCH_DURATION_MS = 500 as const;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useDebouncedOptionLoader = <T, P extends any[] = []>(
  fetchFn: (query: string, ...params: P) => Promise<T[]>,
  mapFn: (item: T) => OptionType,
  ...defaultParams: P
) => {
  const debouncedFetch = debounce(
    async (query: string, resolve: (options: OptionType[]) => void) => {
      const items = await fetchFn(query, ...defaultParams);
      const mappedItems = items.map(mapFn);
      resolve(mappedItems);
    },
    DEFAULT_DEBOUNCED_FETCH_DURATION_MS,
  );

  const loadOptions = (inputValue: string) => {
    return new Promise<OptionType[]>((resolve) => {
      debouncedFetch(inputValue, resolve);
    });
  };

  return loadOptions;
};
