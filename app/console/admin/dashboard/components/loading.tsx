import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Card Skeletons */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="rounded-lg border p-4">
        <Skeleton className="h-4 w-1/3 mb-4" />
        <div className="h-[300px]">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border">
        <div className="p-4">
          <Skeleton className="h-4 w-1/4 mb-4" />
        </div>
        <div className="border-t">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border-b last:border-b-0">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
