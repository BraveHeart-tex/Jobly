import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="grid h-[90vh] w-full bg-muted/10 dark:bg-background lg:min-h-[600px] xl:min-h-[800px] overflow-hidden">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[90%] max-w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full rounded-md" />
          </div>
          <div className="grid gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
