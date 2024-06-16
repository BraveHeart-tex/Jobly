"use client";

import QueryStringInput from "@/components/QueryStringInput";
import { Search } from "lucide-react";

const JobListSearchInput = () => {
  return (
    <div className="relative">
      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <QueryStringInput
        queryKey="query"
        placeholder="Job title, skill or company"
        className="pl-7 bg-card"
      />
    </div>
  );
};

export default JobListSearchInput;
