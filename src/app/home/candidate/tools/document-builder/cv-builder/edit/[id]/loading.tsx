import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="grid xl:grid-cols-2 w-full -mt-10">
      <div className="bg-card h-[90vh] p-10 overflow-auto max-h-screen">
        <div className="grid gap-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
        </div>
      </div>
      <div className="hidden xl:block bg-muted-foreground dark:bg-secondary min-h-screen fixed top-0 right-0 w-1/2">
        <div className="h-12" />
        <div className="h-[90vh] w-[63%] mx-auto pt-4">
          <Skeleton className="h-full w-full bg-secondary dark:bg-muted" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
