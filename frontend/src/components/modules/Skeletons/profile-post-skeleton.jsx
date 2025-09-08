import { Skeleton } from "@/components/ui/skeleton";

export const ProfilePostSkeleton = () => (
  <div className="p-5 lg:p-10 space-y-8 w-full">
    <Skeleton className={"h-[25px] lg:h-[40px] w-[100px]"} />
    <ul className="flex flex-col flex-wrap gap-10">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className={"h-[400px] w-full"} />
      ))}
    </ul>
  </div>
);
