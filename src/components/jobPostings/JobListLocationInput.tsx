import QueryStringInput from "@/components/QueryStringInput";
import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { MapPin } from "lucide-react";

const JobListLocationInput = () => {
  return (
    <div className="relative w-full">
      <MapPin
        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <QueryStringInput
        queryKey={URL_SEARCH_QUERY_KEYS.JOB_LOCATION}
        placeholder="Location"
        className="pl-7 bg-card"
        debounceMs={400}
      />
    </div>
  );
};

export default JobListLocationInput;
