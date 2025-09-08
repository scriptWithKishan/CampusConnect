import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const HomeSkeleton = () => {
  return (
    <div className="flex gap-2 min-h-screen h-full">
      <div className="w-1/4 p-10 hidden lg:block">
        <Skeleton className={"h-[20px] lg:h-[30px] w-[120px]"} />
      </div>
      <Separator className="hidden lg:block" orientation="vertical" />
      <div className="p-5 lg:p-10 space-y-8 w-full lg:w-2/4">
        <Skeleton className={"h-[25px] lg:h-[40px] w-[100px]"} />
        <ul className="flex flex-col flex-wrap gap-10">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className={"h-[400px] w-full"} />
          ))}
        </ul>
      </div>
      <Separator className="hidden lg:block" orientation="vertical" />
      <div className="w-1/4 p-10 hidden lg:block">
        <Skeleton className={"h-[20px] lg:h-[30px] w-[120px]"} />
      </div>
    </div>
  );
};
