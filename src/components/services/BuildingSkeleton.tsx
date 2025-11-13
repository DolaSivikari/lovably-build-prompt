import { Skeleton } from "@/components/ui/skeleton";

export const BuildingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Skeleton className="h-[500px] w-full rounded-xl" />
      <div className="flex justify-center gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};
