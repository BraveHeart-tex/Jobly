import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="grid xl:grid-cols-2 fixed top-0 z-50 w-full">
      <div className="bg-card min-h-screen p-10 overflow-auto max-h-screen">
        <div className="grid gap-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
        </div>
      </div>
      <div className="hiden xl:block bg-muted-foreground dark:bg-secondary min-h-screen">
        <div className="h-12" />
        <div className="h-[90vh] w-[63%] mx-auto pt-4">
          <Skeleton className="h-full w-full bg-secondary dark:bg-muted" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
