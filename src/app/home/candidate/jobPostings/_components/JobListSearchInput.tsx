"use client";

import QueryStringInput from "@/components/QueryStringInput";
import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { Search } from "lucide-react";

const JobListSearchInput = () => {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <QueryStringInput
        queryKey={URL_SEARCH_QUERY_KEYS.QUERY}
        placeholder="Job title, skill or company"
        className="pl-7 bg-card"
        debounceMs={400}
      />
    </div>
  );
};

export default JobListSearchInput;
