"use client";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Input } from "../ui/input";

interface QueryStringInputProps {
  queryKey: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

const QueryStringInput = ({
  queryKey,
  defaultValue = "",
  placeholder,
  className,
  debounceMs = 0,
}: QueryStringInputProps) => {
  const [debouncedQuery, setDebouncedQuery] = useQueryState(queryKey, {
    defaultValue,
  });

  const [query, setQuery] = useState(debouncedQuery);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

  useDebounce(
    () => {
      setDebouncedQuery(query);
    },
    debounceMs,
    [query],
  );

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default QueryStringInput;
