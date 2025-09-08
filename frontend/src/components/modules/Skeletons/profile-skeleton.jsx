import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-row lg:flex-col gap-4 lg:items-center">
      <Skeleton className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] rounded-full" />
      <Skeleton className="h-[100px] lg:h-[300px] w-[200px] lg:w-[300px] rounded-md" />
    </div>
  );
};
