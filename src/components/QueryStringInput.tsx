"use client";
import { useQueryState } from "nuqs";
import { Input } from "./ui/input";

type QueryStringInputProps = {
  queryKey: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
};

const QueryStringInput = ({
  queryKey,
  defaultValue = "",
  placeholder,
  className,
}: QueryStringInputProps) => {
  const [query, setQuery] = useQueryState(queryKey, {
    defaultValue,
  });

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
