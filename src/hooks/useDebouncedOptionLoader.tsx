import type { OptionType } from "@/components/common/CreatableMultiSelect";
import debounce from "lodash.debounce";

const DEFAULT_DEBOUNCED_FETCH_DURATION_MS = 500 as const;

export const useDebouncedOptionLoader = <T,>(
  fetchFn: (query: string) => Promise<T[]>,
  mapFn: (item: T) => OptionType,
) => {
  const debouncedFetch = debounce(
    async (query: string, resolve: (options: OptionType[]) => void) => {
      const items = await fetchFn(query);
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
